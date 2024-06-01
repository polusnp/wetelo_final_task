# NestJS Application

This project is a NestJS application with modules for user management, authentication, advertisements, and mail services. It leverages TypeORM for database interactions and JWT for authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the app](#running-the-app)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: Create, update, delete, and retrieve user information.
- **Authentication**: Register and login users using JWT-based authentication.
- **Advertisements**: Manage advertisements with CRUD operations.
- **Mail Service**: Integrate with a mail service for email notifications.
- **Role-based Access Control**: Use guards to enforce user roles and permissions.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **TypeORM**: An ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms and can be used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Docker**: A set of platforms as a service products that use OS-level virtualization to deliver software in packages called containers.
- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties.
- **Passport**: A popular Node.js middleware for handling authentication.
- **class-validator**: A library for validating objects in JavaScript and TypeScript.
- **class-transformer**: A library that can be used to transform plain JavaScript objects into instances of classes and vice versa.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repository.git
   ```

2. Navigate to the project directory:

   ```bash
   cd your-repository
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```bash
   DB POSTGRESQL config

   POSTGRES_PORT=POSTGRES_PORT
   POSTGRES_USER=POSTGRES_USER
   POSTGRES_DB=POSTGRES_DB
   POSTGRES_HOST=POSTGRES_HOST
   POSTGRES_PASSWORD=POSTGRES_PASSWORD

   JWT config

   JWT_SECRET=JWT_SECRET
   JWT_EXPIRATION_TIME=JWT_EXPIRATION_TIME

   NODEMAILER config

   EMAIL=EMAIL
   EMAIL_PASSWORD=EMAIL_PASSWORD
   ```

## Running the app

1. Start the development server:
   ```bash
   npm run start:dev
   ```

# Project Structure

src/
├── common/
│ └── enums/
│ └── usersRole.enum.ts
├── modules/
│ ├── ads/
│ │ ├── controllers/
│ │ │ └── ads.controllers.ts
│ │ ├── dto/
│ │ │ ├── createAd.dto.ts
│ │ │ └── updateAd.dto.ts
│ │ ├── entities/
│ │ │ └── ads.entity.ts
│ │ ├── services/
│ │ │ └── ads.servise.ts
│ │ └── ads.module.ts
│ ├── auth/
│ │ ├── controllers/
│ │ │ └── auth.controllers.ts
│ │ ├── dto/
│ │ │ ├── loginUser.dto.ts
│ │ │ └── createUser.dto.ts
│ │ ├── guards/
│ │ │ └── jwt.guard.ts
│ │ ├── services/
│ │ │ └── auth.services.ts
│ │ ├── strategies/
│ │ │ └── jwt.strategy.ts
│ │ └── auth.module.ts
│ ├── mail/
│ │ └── mail.module.ts
│ ├── users/
│ │ ├── controllers/
│ │ │ └── users.controllers.ts
│ │ ├── dto/
│ │ │ ├── createUser.dto.ts
│ │ │ └── updateUser.dto.ts
│ │ ├── entities/
│ │ │ └── user.entity.ts
│ │ ├── services/
│ │ │ └── users.service.ts
│ │ └── users.module.ts
│ └── database/
│ └── database.module.ts
├── app.module.ts
└── main.ts

# Endpoints

Auth
POST /auth/register - Register a new user
POST /auth/login - Login a user

Users

GET /users - Get all users (Admin only)
GET /users/:id - Get user by ID (Admin and User)
POST /users - Create a new user (Admin only)
PUT /users/:id - Update a user by ID (Admin only)
DELETE /users/:id - Delete a user by ID (Admin only)
PATCH /users/verify/:id - Verify a user by ID (Admin only)
PATCH /users/role/:id - Change user role by ID (Admin only)

Ads

GET /ads - Get all ads
GET /ads/:id - Get ad by ID
POST /ads - Create a new ad (Verified users only)
PUT /ads/:id - Update an ad by ID (Verified users only)
DELETE /ads/:id - Delete an ad by ID (Verified users only)

# Contributing

Fork the repository.
Create a new branch: git checkout -b my-new-feature.
Make your changes and commit them: git commit -m 'Add some feature'.
Push to the branch: git push origin my-new-feature.
Submit a pull request.

# License

This project is licensed under the MIT License.
