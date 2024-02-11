const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');

const router = express.Router();

// Route to get all projects
router.get('/projects', async (req, res) => {
  try {
    const pool = await getConnection();
    const projectsResult = await pool.request().query('SELECT * FROM projects');

    const projects = projectsResult.recordset;
    for (let project of projects) {
      // Fetch images for each project
      const mediaResult = await pool.request()
        .input('project_id', sql.Int, project.id)
        .query('SELECT image_path FROM project_media WHERE project_id = @project_id');
      project.image_paths = mediaResult.recordset.map(media => media.image_path);
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new project
router.post('/projects', [
  body('project_name').trim().notEmpty().withMessage('Project name is required'),
  body('date_started').optional().isISO8601().withMessage('Start date must be a valid date'),
  body('date_ended').optional().isISO8601().withMessage('End date must be a valid date'),
  body('photo').trim().notEmpty().withMessage('Primary photo is required'),
  body('short_description').trim().notEmpty().withMessage('Short description is required'),
  body('long_description').trim().notEmpty().withMessage('Long description is required'),
  body('image_paths').isArray().withMessage('Image paths must be an array'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { project_name, date_started, date_ended, photo, short_description, long_description, image_paths } = req.body;

  try {
    const pool = await getConnection();
    const projectResult = await pool.request()
      .input('project_name', sql.VarChar, project_name)
      .input('date_started', sql.Date, date_started)
      .input('date_ended', sql.Date, date_ended)
      .input('photo', sql.VarChar, photo)
      .input('short_description', sql.VarChar, short_description)
      .input('long_description', sql.VarChar, long_description)
      .query(`INSERT INTO projects (project_name, date_started, date_ended, photo, short_description, long_description)
              OUTPUT INSERTED.id
              VALUES (@project_name, @date_started, @date_ended, @photo, @short_description, @long_description)`);

    const projectId = projectResult.recordset[0].id;

    // Insert each image path into the project_media table
    for (const image_path of image_paths) {
      await pool.request()
        .input('project_id', sql.Int, projectId)
        .input('image_path', sql.Text, image_path) // Ensure your SQL type matches the column type
        .query(`INSERT INTO project_media (project_id, image_path) VALUES (@project_id, @image_path)`);
    }

    res.status(201).json({ message: 'Project created successfully with media' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Exporting project routes
module.exports = router;
