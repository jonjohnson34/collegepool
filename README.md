# Robs Hockey Pool - MEAN Stack Application

A full-stack web application built with the MEAN stack (MongoDB, Express.js, Angular, Node.js) for managing a hockey pool.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **User Management**: Profile management and user data handling
- **RESTful API**: Full CRUD operations with Express.js backend
- **Modern UI**: Responsive design with Angular and Bootstrap
- **Database**: MongoDB with Mongoose ODM
- **Security**: Password hashing, input validation, and secure middleware

## Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing

### Frontend
- **Angular 17**: Frontend framework
- **Bootstrap 5**: CSS framework
- **TypeScript**: Programming language
- **RxJS**: Reactive programming

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd robs-hockey-pool
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup**
   ```bash
   # Copy environment example
   cp env.example .env
   
   # Edit .env file with your configuration
   nano .env
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. **Start the application**
   ```bash
   # Start both backend and frontend
   npm run dev:full
   
   # Or start them separately
   npm run server    # Backend only
   npm run client    # Frontend only
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

## Project Structure

```
robs-hockey-pool/
├── client/                 # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Angular components
│   │   │   ├── services/   # Angular services
│   │   │   └── guards/     # Route guards
│   │   └── styles.scss     # Global styles
│   └── package.json
├── models/                 # Mongoose models
├── routes/                 # Express routes
├── server.js              # Express server
├── package.json
└── README.md
```

## Development

### Backend Development
- The server runs on `http://localhost:5000`
- API endpoints are prefixed with `/api`
- MongoDB connection is configured in `server.js`

### Frontend Development
- The Angular app runs on `http://localhost:4200`
- Uses Angular standalone components
- Bootstrap for styling and responsive design

## Deployment

### Backend Deployment
1. Set environment variables
2. Install dependencies: `npm install`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build-client`
2. Serve the built files from the `dist` folder

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team. 