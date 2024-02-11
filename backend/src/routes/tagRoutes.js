const express = require('express');
const sql = require('mssql');
const getConnection = require('../../config/database');

const router = express.Router();

router.get('/tags', async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query('SELECT * FROM tags');
      res.json(result.recordset);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  //Exporting tag routes
  module.exports = router;