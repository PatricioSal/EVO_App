/**
 * User Sync Server
 * 
 * This server automatically syncs new users from the app to the project users.txt file.
 * Run this server alongside your Expo app: node userSyncServer.js
 * 
 * The app will automatically send new user data to this server when someone signs up.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const USERS_FILE = path.join(__dirname, 'users.txt');

// Email configuration (for production, use environment variables)
// For development, you can use Gmail, SendGrid, or other email services
// Set USE_CONSOLE_EMAIL=true to log codes to console instead of sending emails
const USE_CONSOLE_EMAIL = process.env.USE_CONSOLE_EMAIL !== 'false'; // Default to true for easy dev

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/add-user') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        
        if (!email || !password) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email and password required' }));
          return;
        }

        // Read existing file
        let fileContent = '';
        if (fs.existsSync(USERS_FILE)) {
          fileContent = fs.readFileSync(USERS_FILE, 'utf8');
        }

        // Check if email already exists
        const lines = fileContent.split('\n').filter(line => {
          const trimmed = line.trim();
          return trimmed && !trimmed.startsWith('#');
        });

        const emailExists = lines.some(line => {
          const [storedEmail] = line.split(':');
          return storedEmail.trim().toLowerCase() === email.toLowerCase();
        });

        if (emailExists) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email already exists' }));
          return;
        }

        // Append new user (preserve comments)
        const newUser = `${email.trim()}:${password.trim()}\n`;
        
        // If file ends with newline, just append, otherwise add newline first
        if (fileContent && !fileContent.endsWith('\n')) {
          fileContent += '\n';
        }
        
        fileContent += newUser;
        fs.writeFileSync(USERS_FILE, fileContent, 'utf8');

        console.log(`✓ New user added: ${email}`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'User added successfully' }));
      } catch (error) {
        console.error('Error adding user:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to add user' }));
      }
    });
  } else if (req.method === 'POST' && req.url === '/send-2fa-code') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const { email, code } = JSON.parse(body);
        
        if (!email || !code) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Email and code required' }));
          return;
        }

        // For development: log to console
        if (USE_CONSOLE_EMAIL) {
          console.log('\n═══════════════════════════════════════════');
          console.log('📧 2FA VERIFICATION CODE');
          console.log('═══════════════════════════════════════════');
          console.log(`To: ${email}`);
          console.log(`Code: ${code}`);
          console.log('═══════════════════════════════════════════\n');
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            success: true, 
            message: 'Code sent (check console for development)',
            code: code // Include code in dev mode for testing
          }));
          return;
        }

        // For production: send actual email
        // You would integrate with nodemailer, SendGrid, etc. here
        // Example with nodemailer:
        /*
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Your EVO App Verification Code',
          html: `
            <h2>Your Verification Code</h2>
            <p>Your verification code is: <strong>${code}</strong></p>
            <p>This code will expire in 5 minutes.</p>
          `
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Email error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to send email' }));
          } else {
            console.log(`✓ 2FA code sent to ${email}`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Code sent successfully' }));
          }
        });
        */
        
        // Fallback if email not configured
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Code would be sent via email',
          code: code // Include in dev
        }));

      } catch (error) {
        console.error('Error sending 2FA code:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to send code' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n🚀 User Sync Server running on http://localhost:${PORT}`);
  console.log(`📝 Users will be automatically saved to: ${USERS_FILE}`);
  console.log(`📧 2FA codes will be logged to console (development mode)\n`);
});

