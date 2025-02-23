const {pool} = require('../database/connect');
const jwt = require('jsonwebtoken');

const test = async (req, res) => {
    const cookies = req.cookies;
    
    const [rows] = await pool.execute('SELECT * FROM Compte;');
    res.json(rows);
}

module.exports = {test};