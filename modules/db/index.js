const { createPool } = require('mysql2/promise');

console.log(process.env.DB_HOST)
const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true
});


const query = async (sql, params) => {
    const [rows, fields] = await db.execute(sql, params);
    return rows;
}

module.exports = {db, query} ;
