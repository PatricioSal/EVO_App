# Admin Account Information

## Admin Credentials

**Email:** `admin@evo.app`  
**Password:** `admin123`

## Admin Features

### Admin Login
- **No 2FA required** - Admin bypasses the two-factor authentication
- **Direct access** - Goes straight to Admin Panel after login
- **Separate navigation** - Uses AdminTabs instead of regular MainTabs

### Admin Panel Features

#### User Management
- View All Users
- Delete User
- Reset User Password

#### System Settings
- App Configuration
- Database Management
- Security Settings

#### Analytics & Reports
- User Statistics
- System Logs

### Admin Navigation

The admin interface uses a **red-themed tab bar** (different from regular users' green theme):
- **Admin Home** - Dashboard overview
- **Admin Settings** - Full admin panel with all management features

## Security Notes

⚠️ **Important:** 
- Admin credentials are **hardcoded** in `Login.js`
- For production, consider:
  - Moving admin credentials to environment variables
  - Using a proper authentication system
  - Adding admin activity logging
  - Implementing role-based access control (RBAC)

## Changing Admin Credentials

To change the admin email/password, edit `Login.js` lines 18-19:
```javascript
const ADMIN_EMAIL = 'admin@evo.app';
const ADMIN_PASSWORD = 'admin123';
```

