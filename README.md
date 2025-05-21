# Social Media Management Platform

## OAuth Setup Guide

### Twitter OAuth Setup

1. Go to the [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new project and app
3. In the app settings:
   - Set the App permissions to "Read and write"
   - Enable "OAuth 2.0" in the Authentication settings
   - Add callback URL: `http://localhost:5173/auth/twitter/callback`
   - Save the Client ID

### Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google+ API
4. Configure the OAuth consent screen:
   - Add authorized domains
   - Add scopes for email and profile
5. Create OAuth 2.0 credentials:
   - Set application type as "Web application"
   - Add authorized redirect URI: `http://localhost:5173/auth/google/callback`
   - Save the Client ID

### Environment Variables Setup

1. Create or update the `.env` file in the project root:
```env
# Twitter OAuth Configuration
VITE_TWITTER_CLIENT_ID=your_twitter_client_id
VITE_TWITTER_REDIRECT_URI=http://localhost:5173/auth/twitter/callback

# Google OAuth Configuration
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

### Backend API Setup

Create these endpoints in your backend:

1. Twitter OAuth endpoints:
```javascript
/api/auth/twitter/login  // Initiates Twitter OAuth flow
/api/auth/twitter/callback  // Handles Twitter OAuth callback
```

2. Google OAuth endpoints:
```javascript
/api/auth/google/login  // Initiates Google OAuth flow
/api/auth/google/callback  // Handles Google OAuth callback
```

Each callback endpoint should:
- Validate the OAuth code
- Exchange the code for access tokens
- Create or update user in the database
- Return JWT or session token

## Security Considerations

- Store sensitive credentials only in environment variables
- Implement CSRF protection
- Use secure session management
- Validate all OAuth state parameters
- Implement proper error handling
