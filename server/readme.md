# Sleep Tracker API

## Overview
This API is built using TypeScript and Node.js, designed to track users' sleep data. It supports operations to add and retrieve user sleep data and visualize trends over time.

## Prerequisites
- Node.js
- TypeScript
- AWS SDK
- Express
- Other dependencies listed in `package.json`

## Installation

1. Clone the repository:

git clone https://github.com/starsagitarian/TechTaskCynomi.git

2. Navigate to the project directory:

cd server

3. Install dependencies:

npm install

4. Configure environment variables:
- Create a `.env` file in the project root.
- Add the following keys:
  ```
  AWS_ACCESS_KEY_ID=your_access_key
  AWS_SECRET_ACCESS_KEY=your_secret_key
  AWS_REGION=your_aws_region
  PORT=3000 // Or any port you prefer
  ** i have used port 3054, you can modify the port as per your convienience **
  ```

## Running the API
To start the API, run:

npm start

This will start the server on the port specified in your `.env` file.

## API Endpoints

### 1. Add User Sleep Data
- **POST** `/api/user-data`
- Adds sleep data for a user. If the user does not exist, creates a new user profile.
- **Body**:
  ```json
  {
    "email": "example@email.com",
    "name": "John Doe",
    "gender": "male",
    "date": "2024-07-21",
    "sleepTime": 8
  }

- this also checks up if a user is existing as it works with the another endpoint called findUserByEmail, if an id with the same email is present, it will upend the sleep information against the existing UserId, thereby managing idempotence.

### 2. Get User by ID
- **GET** `/api/users/:UserId`
- Retrieves a user's profile by their unique identifier.
- URL Parameters: UserId is the user's unique ID. 

### 3. Get All Users
- **GET** /api/users
- Retrieves a user's profile by their unique identifier.
- URL Parameters: UserId is the user's unique ID.

### 4. Get User by Email
- **GET** /api/user/email/:email
- Retrieves user profile by email address.
- URL Parameters: email is the user's email address.

### 5. Fetch Recent Sleep Data
- **GET** /api/user/:userId/sleep-data/recent
- Fetches sleep data for the last seven days for a specific user.
- URL Parameters: userId is the user's unique ID.


## Notes

- The database used here is and AWS DynamoDB instance. Ensure your AWS credentials are correct and have permissions to access DynamoDB.
- The API uses logging to help trace data flow and debug.


This README provides a basic introduction, setup instructions, and a description of each API endpoint. You should replace placeholder values like `<repository-url>` and `<project-directory>` with actual values relevant to your project. Make sure to review and adjust the details to fit your project requirements and any additional instructions your users might need.

For support, contact me!! Happy Coding !!