const mysql = require('mysql2/promise');


// Conexión a BD MySQL
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Validar conexión a la BD
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        console.log(err);
    } else {
        console.log('Conexión a la base de datos exitosa');
        connection.release();
    }
});

module.exports = { db };