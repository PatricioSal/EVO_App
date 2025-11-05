# Two-Factor Authentication (2FA) Setup

Your app now includes 2FA! After logging in with email and password, users must enter a 6-digit verification code sent to their email.

## How It Works

1. **User logs in** with email and password
2. **System generates** a 6-digit verification code
3. **Code is sent** to the user's email (or logged to console in dev mode)
4. **User enters code** on the 2FA screen
5. **Access granted** after successful verification

## Development Mode (Current Setup)

By default, the system runs in **development mode**:
- Codes are logged to the **server console** (not sent via email)
- You'll see the code in the terminal where `userSyncServer.js` is running
- Codes are also shown in an alert if the server isn't running

### To Test:

1. **Start the sync server**:
   ```bash
   npm run sync-server
   ```

2. **Start your Expo app**:
   ```bash
   npm start
   ```

3. **Log in** - you'll see the 2FA code in the server console:
   ```
   ═══════════════════════════════════════════
   📧 2FA VERIFICATION CODE
   ═══════════════════════════════════════════
   To: user@example.com
   Code: 123456
   ═══════════════════════════════════════════
   ```

4. **Enter the code** on the 2FA screen

## Production Setup (Real Email Sending)

To send actual emails in production, you'll need to:

### Option 1: Using Nodemailer (Gmail, SMTP)

1. **Install nodemailer**:
   ```bash
   npm install nodemailer
   ```

2. **Update `userSyncServer.js`**:
   - Uncomment the nodemailer code (lines 133-165)
   - Set environment variables:
     ```bash
     export EMAIL_USER=your-email@gmail.com
     export EMAIL_PASS=your-app-password
     ```
   - Set `USE_CONSOLE_EMAIL=false`

3. **For Gmail**: You'll need an [App Password](https://support.google.com/accounts/answer/185833)

### Option 2: Using SendGrid

1. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```

2. **Add to `userSyncServer.js`**:
   ```javascript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   const msg = {
     to: email,
     from: 'your-email@example.com',
     subject: 'Your EVO App Verification Code',
     text: `Your verification code is: ${code}`,
     html: `<h2>Your Verification Code</h2><p>Your verification code is: <strong>${code}</strong></p>`
   };
   
   sgMail.send(msg);
   ```

### Option 3: Using EmailJS (Client-side)

EmailJS works directly from the React Native app without a server.

## Features

- ✅ 6-digit verification codes
- ✅ 5-minute expiration timer
- ✅ Auto-advance to next input field
- ✅ Resend code functionality
- ✅ Code validation
- ✅ Development mode (console logging)
- ✅ Production-ready email integration structure

## Troubleshooting

### Code not appearing?
- Make sure `userSyncServer.js` is running
- Check the server console for the code
- If server isn't running, you'll see an alert with the code

### Need to change code expiration?
Edit `TwoFactorAuth.js` line 9:
```javascript
const [timeLeft, setTimeLeft] = useState(300); // Change 300 to desired seconds
```

### Want to disable 2FA for testing?
In `Login.js`, comment out the 2FA code and navigate directly to MainTabs:
```javascript
// navigation.navigate('TwoFactorAuth', {...});
navigation.navigate('MainTabs');
```

