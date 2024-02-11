const express = require('express');
const { body, validationResult } = require('express-validator');
const sql = require('mssql');
const getConnection = require('../../config/database');

const router = express.Router();


// GET all people
router.get('/team', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM people');
        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new person
router.post('/team', [
    body('first_name').trim().notEmpty().withMessage('First name is required'),
    body('last_name').trim().notEmpty().withMessage('Last name is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('photo').trim().notEmpty().withMessage('Photo is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('email').trim().isEmail().withMessage('Valid email is required'),
    body('linkedin').trim().optional(),
    body('instagram').trim().optional(),
    body('twitter').trim().optional(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, title, photo, content, email, linkedin, instagram, twitter } = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('first_name', sql.VarChar, first_name)
            .input('last_name', sql.VarChar, last_name)
            .input('title', sql.VarChar, title)
            .input('photo', sql.VarChar, photo)
            .input('content', sql.VarChar, content)
            .input('email', sql.VarChar, email)
            .input('linkedin', sql.VarChar, linkedin)
            .input('instagram', sql.VarChar, instagram)
            .input('twitter', sql.VarChar, twitter)
            .query(`INSERT INTO people (first_name, last_name, title, photo, content, email, linkedin, instagram, twitter) 
                VALUES (@first_name, @last_name, @title, @photo, @content, @email, @linkedin, @instagram, @twitter)`);

        res.status(201).json({ message: 'Person added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Exporting people routes
module.exports = router;