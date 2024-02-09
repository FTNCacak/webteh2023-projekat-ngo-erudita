const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');
const router = express.Router();

// GET all blog posts
router.get('/blogs', async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM blogs');
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// POST a new blog post
router.post('/blogs', [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('photo').trim().optional(),
    body('short_description').trim().notEmpty().withMessage('Short description is required'),
    body('long_description').trim().notEmpty().withMessage('Long description is required'),
    body('date_posted').optional().isISO8601().withMessage('Date posted must be a valid date').toDate(),
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { title, photo, short_description, long_description, date_posted } = req.body;
  
    try {
      const pool = await getConnection();
      await pool.request()
        .input('title', sql.VarChar, title)
        .input('photo', sql.VarChar, photo)
        .input('short_description', sql.VarChar, short_description)
        .input('long_description', sql.VarChar, long_description)
        .input('date_posted', sql.Date, date_posted || new Date()) // Use current date if not provided
        .query(`INSERT INTO blogs (title, photo, short_description, long_description, date_posted) 
                VALUES (@title, @photo, @short_description, @long_description, @date_posted)`);
      
      res.status(201).json({ message: 'Blog post added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;