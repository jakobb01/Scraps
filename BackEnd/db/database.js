import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
}).promise();

async function getAll() {
    const [rows] = await pool.query("SELECT * FROM test");
    return rows;
}

// prepared statement
async function getById(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM test
        WHERE id = ?
        `, [id]);
    return rows;
}

async function create(id, body) {
    const [result] = await pool.query(`
        INSERT INTO test (id, body)
        VALUES (?, ?)
        `, [id, body]);
    const new_id = result.insertId;
    return getById(new_id);
}

module.exports = { getAll, getById, create, pool };
