# Firebase Authentication Setup Guide

## Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select an existing project
3. Follow the setup wizard to create your project

## Step 2: Enable Google Authentication
1. In the Firebase Console, select your project
2. Click "Build" in the left sidebar
3. Click "Authentication" under the Build section
4. Click "Get Started" if you haven't enabled Authentication yet
5. In the "Sign-in method" tab, you'll see a list of sign-in providers
6. Find "Google" in the list and click on it
7. Toggle the "Enable" switch to turn it on
8. Configure the provider:
   - Add your project's public-facing name
   - Select a project support email
9. Click "Save"

## Step 3: Get Configuration Values
1. Go to Project Settings (gear icon near "Project Overview")
2. Under the "General" tab, scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app with a nickname
5. Copy the configuration values:
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId

## Step 4: Set Up Environment Variables
1. Create a `.env` file in your project root
2. Copy the values from `.env.example`
3. Replace the placeholder values with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-actual-auth-domain
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-actual-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

## Troubleshooting
- Make sure you're signed in to Firebase Console with a Google account
- Ensure you have the necessary permissions to modify authentication settings
- If you get errors about unauthorized domains, add your app's domain to the authorized domains list in the Firebase Console under Authentication > Settings
- For local development, `localhost` should be automatically added to authorized domains