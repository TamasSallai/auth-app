# Authentication App

## Overview

This application provides a secure and seamless experience for user registration, login, and profile management. It leverages industry-standard technologies and practices to ensure security, scalability, and performance.

The backend, built with NestJS, handles all authentication logic, including user creation, credential verification, and session management.

The frontend, developed with React, communicates with the backend via RESTful API calls, managing user interactions and displaying relevant information.

The app implements best practices in security including:

- Password hashing
- Email uniqueness validation
- Session-based authentication with HTTP-only cookies
- Input normalization
- Error handling to provide clear feedback to users

## Development Insights

My goal was to create a secure authentication application that enables users to register locally and through third-party OAuth providers, **which** can be used in future projects.

During development, I encountered many design decisions that required **careful** consideration. To list a few:

- Session-based or JWT authentication? This was only a matter of preference. A session-based authentication is easy to implement, but the drawback is that **the** project now needs a fast memory database to save the sessions (Redis).
- Users and OAuth accounts are saved in different tables with a one-to-many connection between them.
- After a user has registered with email and password, they can link an OAuth account by simply logging in with a selected provider.
- A user **who** first registered with an OAuth account can set up a password manually after logging in, making email and password authentication available.
- By default, a user is in "not verified" status and they can verify their account in 2 ways:
  - Through email verification
  - OAuth users have a verified status by default, so logging in with an OAuth account can verify an unverified user.

### Features

- User registration with email and password
- Email verification
- OAuth authentication through multiple providers
- Session-based authentication with HTTP-only cookies
- Error handling for various scenarios

## Technologies

### Backend

- **TypeScript**: Programming language for type-safe development
- **NestJS** with Express: A progressive Node.js framework for building efficient and scalable server-side applications
- **Passport**: Authentication middleware for Node.js
- **Redis**: For storing user sessions, ensuring fast access and scalability
- **PostgreSQL**: Robust relational database for storing user and OAuth data
- **Prisma**: Database ORM for Node.js and TypeScript

### Frontend

- **TypeScript**: Programming language for type-safe development
- **Vite**: Next-generation frontend tooling for faster and leaner development
- **React**: A JavaScript library for building user interfaces
- **Tanstack Query**: For efficient server state management and data synchronization
