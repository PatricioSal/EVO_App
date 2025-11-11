/**
 * Sync Users Script
 * 
 * This script helps sync users from the app's runtime storage back to the project users.txt file.
 * 
 * Usage (in development):
 * 1. Run the app and note the document directory path from console logs
 * 2. Update the DOCUMENT_DIRECTORY path below with your app's document directory
 * 3. Run: node syncUsers.js
 * 
 * Note: This is a helper script for development. In production, you'd typically
 * use a backend API to manage user accounts.
 */

const fs = require('fs');
const path = require('path');

// Update this path to your app's document directory
// You can find this in the console logs when the app runs
// Example: /path/to/expo/app/data/
const DOCUMENT_DIRECTORY = '';

// Project users.txt file path
const PROJECT_USERS_FILE = path.join(__dirname, 'users.txt');

function syncUsers() {
  if (!DOCUMENT_DIRECTORY) {
    console.log('Please update DOCUMENT_DIRECTORY in syncUsers.js with your app\'s document directory path');
    console.log('You can find this path in the console logs when the app runs');
    return;
  }

  const runtimeUsersFile = path.join(DOCUMENT_DIRECTORY, 'users.txt');
  
  if (!fs.existsSync(runtimeUsersFile)) {
    console.log('Runtime users file not found. Make sure the app has created at least one user.');
    return;
  }

  try {
    // Read runtime users
    const runtimeContent = fs.readFileSync(runtimeUsersFile, 'utf8');
    const runtimeLines = runtimeContent.split('\n').filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#');
    });

    // Read project users (keep comments)
    let projectContent = '';
    if (fs.existsSync(PROJECT_USERS_FILE)) {
      projectContent = fs.readFileSync(PROJECT_USERS_FILE, 'utf8');
    }

    // Extract comments from project file
    const projectLines = projectContent.split('\n');
    const comments = projectLines.filter(line => line.trim().startsWith('#') || !line.trim());
    const existingUsers = projectLines.filter(line => {
      const trimmed = line.trim();
      return trimmed && !trimmed.startsWith('#');
    });

    // Merge users (runtime takes precedence)
    const allUsers = [...existingUsers];
    runtimeLines.forEach(runtimeLine => {
      const [email] = runtimeLine.split(':');
      if (!allUsers.some(line => line.split(':')[0].trim() === email.trim())) {
        allUsers.push(runtimeLine);
      }
    });

    // Write back to project file
    const newContent = comments.join('\n') + '\n' + allUsers.join('\n') + '\n';
    fs.writeFileSync(PROJECT_USERS_FILE, newContent, 'utf8');

    console.log('Users synced successfully!');
    console.log(`Found ${allUsers.length} users`);
  } catch (error) {
    console.error('Error syncing users:', error);
  }
}

syncUsers();

