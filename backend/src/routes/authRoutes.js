const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const getConnection = require('../../config/database'); // Importing database.js and get connection function

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const pool = await getConnection();
    await pool.request()
              .input('username', sql.VarChar, username)
              .input('password', sql.VarChar, hashedPassword)
              .input('email', sql.VarChar, email)
              .query('INSERT INTO users (username, password, email) VALUES (@username, @password, @email)');

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await getConnection();

    const result = await pool.request()
                             .input('username', sql.VarChar, username)
                             .query('SELECT * FROM users WHERE username = @username');

    const users = result.recordset;

    if (users.length > 0) {
      const user = users[0];

      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        res.json({ token });
      } else {
        res.status(401).json({ message: "Wrong password" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//Exporting auth routes
module.exports = router;
