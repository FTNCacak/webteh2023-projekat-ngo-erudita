const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');

const router = express.Router();

// Route to get all projects
router.get('/projects', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM projects');
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new project
router.post('/projects', [
  body('id').optional().isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  body('project_name').trim().notEmpty().withMessage('Project name is required'),
  body('date_started').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('date_ended').optional().isISO8601().withMessage('End date must be a valid date'),
  body('photo').optional().trim(),
  body('short_description').optional().trim(),
  body('long_description').optional().trim(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, project_name, date_started, date_ended, photo, short_description, long_description } = req.body;

  try {
    const pool = await getConnection();
    // First, check if the ID already exists
    if (id) {
      const idCheckResult = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT COUNT(*) as count FROM projects WHERE id = @id');
      if (idCheckResult.recordset[0].count > 0) {
        return res.status(400).json({ message: 'ID already taken' });
      }
    }
    await pool.request()
      .input('id', sql.Int, id)
      .input('project_name', sql.VarChar, project_name)
      .input('date_started', sql.Date, date_started)
      .input('date_ended', sql.Date, date_ended)
      .input('photo', sql.VarChar, photo)
      .input('short_description', sql.VarChar, short_description)
      .input('long_description', sql.VarChar, long_description)
      .query('INSERT INTO projects (id, project_name, date_started, date_ended, photo, short_description, long_description) VALUES (@id, @project_name, @date_started, @date_ended, @photo, @short_description, @long_description)');

    res.status(201).json({ message: 'Project created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
