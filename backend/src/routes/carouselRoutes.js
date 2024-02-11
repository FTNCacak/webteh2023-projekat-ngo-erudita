const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');

const router = express.Router();

// GET all carousel items
router.get('/carousels', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM carousels');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new carousel item
router.post('/carousels', [
    body('photo').trim().notEmpty().withMessage('Photo URL is required'),
    body('title').trim().optional(),
    body('content').trim().optional(),
    body('Button_text').trim().optional(),
    body('Button_link').trim().optional(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { photo, title, content, Button_text, Button_link } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('photo', sql.VarChar, photo)
            .input('title', sql.VarChar, title)
            .input('content', sql.VarChar, content)
            .input('Button_text', sql.VarChar, Button_text)
            .input('Button_link', sql.VarChar, Button_link)
            .query(`INSERT INTO carousels (photo, title, content, Button_text, Button_link) 
                VALUES (@photo, @title, @content, @Button_text, @Button_link)`);

        res.status(201).json({ message: 'Carousel item added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Exporting carousel routes
module.exports = router;