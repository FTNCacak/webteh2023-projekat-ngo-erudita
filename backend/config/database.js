require('dotenv').config();

const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: true, // Necessary for Azure SQL
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

const getConnection = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error('Database Connection Failed', error);
        throw error;
    }
};

module.exports = getConnection;
