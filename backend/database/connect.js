const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


// Test de la connexion
// (async () => {
//     try {
//         const [rows] = await pool.execute('SELECT 1');
//         console.log('Connexion réussie au pool !', rows);
//     } catch (err) {
//         console.error('Erreur lors de la connexion au pool :', err);
//     } finally {
//         await pool.end(); // Fermer le pool après utilisation
//     }
// })();

module.exports = pool;