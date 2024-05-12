# Blog Posting Platform (Bloggify)

This repository contains the source code for a Blog Posting App, where users can read and write blogs. The project is divided into two folders: frontend and backend.

## Backend

The backend folder contains the server-side code written in Node.js using Express.js framework. It interacts with a MongoDB database to store user information, blogs, and other data.

### Setup

1. Navigate to the backend folder.
2. Create a `.env` file on the basis of the provided `.env.example` file and update it with your MongoDB Atlas credentials and a secret key for JWT token.
3. Run `npm install` or simply `npm i` to install all dependencies.
4. Start the server by running `nodemon` or `node index.js`.
5. Upon the first run, an admin user will be automatically generated with the credentials:
   - Username: admin
   - Password: admin#123

## Frontend

The frontend folder contains the client-side code written in React.js. It provides the user interface for interacting with the Blog Posting Platform.

### Setup

1. Navigate to the frontend folder.
2. Run `npm install` or simply `npm i` to install all dependencies.
3. Start the frontend development server by running `npm run dev`.

## Usage

Once the backend and frontend servers are running, you can access the Movie Review Platform in your web browser. You can log in as an admin or a user to use the platform features.

- **Admin**: Use the admin credentials provided above to log in and manage users, blogs, and other aspects of the platform.
- **User**: Register for a new account or use existing user credentials to log in and read/write blogs.

## Contributions

Contributions are always welcome! If you find any bug or have some suggestions for making improvements, please open an issue or submit a pull request.
