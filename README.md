# Skill search

This project helps job seekers track in demand skills, it works by calling the REED API and
allowing the user to create bespoke combinations of skills from a predefined list of skills. The user can sign in using Google or Facebook and can save these skill combinations. Once a combination is saved a job is run on a periodic basis to identify the number of jobs available for their skill combination and location.

## Requirements
You will need to have Node.js installed to run this project, please visit the node site for install
instructions: https://nodejs.org/en/download/

## Installation
Once you have NPM installed you can run the following shell commands to install this project, two
npm:
```
git clone https://github.com/jb-0/skills-tracker.git
cd skill-search
npm install
cd client
npm install
```

## Environment variables
For assigning environment variables in dev I opted to use https://www.npmjs.com/package/dotenv,
however you can use your preferred approach to assigning environment variables.
- **DEV_DB_PATH** - The path to your development mongo instance, for example
mongodb://127.0.0.1:27017/skillsearch
- **SESSION_SECRET** - A secret used for session generation
- **LOGIN_REDIRECT** - This should be http://localhost:3000/profile
- **TEST_USER** - An email address used for authenticating a user while running tests
- **TEST_USER_PASSWORD** - A password for authenticating the test user
- **TEST_USER_2** - A different email address used for authenticating a user while running tests
- **TEST_USER_PASSWORD_2** - A password for authenticating the test user
- **REED_B64** - REED API key converted to base64 https://www.reed.co.uk/developers/jobseeker
- **LOGIN_REDIRECT** - In dev this will be http://localhost:3000/profile
- **LOGOUT_REDIRECT** - In dev this will be http://localhost:3000/

Per the passport.js strategy documentation (http://www.passportjs.org/packages/) you need to acquire
a number of secrets from auth providers, specifically:
- **GOOGLE_CLIENT_ID**
- **GOOGLE_CLIENT_SECRET**
- **FACEBOOK_APP_ID**
- **FACEBOOK_APP_SECRET**

## Running the application
To run the app you can execute the following commands in the project root directory:
```
node server.js
cd client
npm start
```

Using your preferred web browser you can navigate to localhost:3000 to view and use the app.
