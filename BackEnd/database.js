import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
}).promise();

async function getQuery() {
    const [rows] = await pool.query("SELECT * FROM test");
    return rows;
}

const rows = getQuery();
console.log(rows);