// Import the express module
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT handling
const helmet = require('helmet'); // For security
const authRoutes = require('./src/routes/authRoutes');
const db = require('./config/database');
require('dotenv').config(); //load .env

// Create an instance of express
const app = express();

// Security Middleware
app.use(helmet());

//Middleware for allowing cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/auth', authRoutes);

// Authentication Middleware (placeholder for actual implementation)
// const authenticateToken = require('./middlewares/authenticateToken');

// Define a route for the root URL
app.get('/', (req, res) => {
  // Send a response when this route is accessed
  res.send('Backend server');
});

// Error Handling Middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
  });

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});