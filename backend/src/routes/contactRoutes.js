const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    console.log('Form data:', { name, email, message });
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error handling contact form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;