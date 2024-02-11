const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');

const router = express.Router();

// POST a new contact form submission
router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Map form fields to database columns
  const { name: name_and_surname, email, message: contact_message } = req.body;

  try {
    const pool = await getConnection();
    await pool.request()
      .input('name_and_surname', sql.VarChar, name_and_surname)
      .input('email', sql.VarChar, email)
      .input('contact_message', sql.VarChar, contact_message)
      .input('date_received', sql.Date, new Date())
      .query(`INSERT INTO contact_forms (name_and_surname, email, contact_message, date_received) 
              VALUES (@name_and_surname, @email, @contact_message, @date_received)`);
    
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all contact form submissions
router.get('/contact', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM contact_forms ORDER BY date_received DESC');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching contact form submissions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Exporting contact routes
module.exports = router;