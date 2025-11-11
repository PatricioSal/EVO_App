# Automatic User Sync Setup

This setup allows new user signups to automatically save to your project's `users.txt` file.

## Quick Start

1. **Start the sync server** in a separate terminal:
   ```bash
   npm run sync-server
   ```
   Or directly:
   ```bash
   node userSyncServer.js
   ```

2. **Start your Expo app** in another terminal:
   ```bash
   npm start
   ```

3. **That's it!** When someone signs up, they'll automatically be added to `users.txt`

## How It Works

- The app saves users to its runtime storage (for login functionality)
- The app also sends new user data to the sync server (running on your computer)
- The server automatically appends new users to `users.txt` in your project root

## Troubleshooting

### If you're using Expo Go on a physical device:

The app needs to connect to your computer's IP address instead of `localhost`. 

1. Find your computer's IP address:
   - **Mac/Linux**: Run `ifconfig` or `ipconfig getifaddr en0`
   - **Windows**: Run `ipconfig` and look for IPv4 Address

2. Update `Signup.js` line 76 to use your IP:
   ```javascript
   const response = await fetch('http://YOUR_IP_ADDRESS:3001/add-user', {
   ```

### Server not running?

If the sync server isn't running, users will still be saved to the app's runtime storage and can log in. They just won't be added to your project `users.txt` file automatically. The app will show a console message if the server isn't available.

## Notes

- The server only runs during development
- Users are always saved to the app's runtime storage (for login to work)
- The sync server is optional - it just makes it easier to manage the project file
- Make sure port 3001 is available (not used by another app)

