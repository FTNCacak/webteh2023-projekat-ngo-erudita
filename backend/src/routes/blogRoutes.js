const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');
const router = express.Router();


// GET all blog posts with their media
router.get('/blogs', async (req, res) => {
  try {
    const pool = await getConnection();
    const blogsResult = await pool.request().query('SELECT * FROM blogs');

    const blogs = blogsResult.recordset;
    for (let blog of blogs) {
      // Fetch media for each blog
      const mediaResult = await pool.request()
        .input('blog_id', sql.Int, blog.id)
        .query('SELECT media_url FROM blog_media WHERE blog_id = @blog_id');
      blog.media_urls = mediaResult.recordset.map(media => media.media_url);
    }

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST a new blog post
router.post('/blogs', [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('photo').trim().notEmpty().withMessage('Front photo is required'),
  body('short_description').trim().notEmpty().withMessage('Short description is required'),
  body('long_description').trim().notEmpty().withMessage('Long description is required'),
  body('date_posted').optional().isISO8601().withMessage('Date posted must be a valid date').toDate(),
  body('media_urls').isArray().withMessage('Media URLs must be an array'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, photo, short_description, long_description, date_posted, media_urls } = req.body;

  try {
    const pool = await getConnection();
    const blogResult = await pool.request()
      .input('title', sql.VarChar, title)
      .input('photo', sql.VarChar, photo)
      .input('short_description', sql.VarChar, short_description)
      .input('long_description', sql.VarChar, long_description)
      .input('date_posted', sql.Date, date_posted || new Date()) // Use current date if not provided
      .query(`INSERT INTO blogs (title, photo, short_description, long_description, date_posted)
              OUTPUT INSERTED.id
              VALUES (@title, @photo, @short_description, @long_description, @date_posted)`);

    const blogId = blogResult.recordset[0].id;

    // Insert each media URL into the blog_media table
    for (const media_url of media_urls) {
      await pool.request()
        .input('blog_id', sql.Int, blogId)
        .input('media_url', sql.VarChar, media_url)
        .query(`INSERT INTO blog_media (blog_id, media_url) VALUES (@blog_id, @media_url)`);
    }

    res.status(201).json({ message: 'Blog post added successfully with media' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
  
//Exporting blog routes
module.exports = router;