/**
 * User Sync Utility
 * 
 * This file helps manage user credentials between the app's runtime storage
 * and the project users.txt file.
 * 
 * The app stores users in: documentDirectory/users.txt (runtime storage)
 * The project file is: users.txt (in project root, for manual editing)
 * 
 * To sync users from runtime storage back to project file:
 * 1. Run the app and check the console for the document directory path
 * 2. Copy the contents from documentDirectory/users.txt to project users.txt
 * 
 * Or use this utility function in your app to export users.
 */

import * as FileSystem from 'expo-file-system';

/**
 * Get all users from runtime storage
 */
export const getUsersFromStorage = async () => {
  try {
    const fileUri = `${FileSystem.documentDirectory}users.txt`;
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    
    if (!fileInfo.exists) {
      return [];
    }
    
    const fileContent = await FileSystem.readAsStringAsync(fileUri);
    const lines = fileContent.trim().split('\n').filter(line => line.trim());
    
    return lines.map(line => {
      const [email, password] = line.split(':');
      return { email: email.trim(), password: password.trim() };
    });
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
};

/**
 * Export users to console (for copying to project file)
 */
export const exportUsersToConsole = async () => {
  const users = await getUsersFromStorage();
  const fileContent = users.map(u => `${u.email}:${u.password}`).join('\n') + '\n';
  console.log('=== USER CREDENTIALS ===');
  console.log(fileContent);
  console.log('=== Copy above to users.txt ===');
  return fileContent;
};

