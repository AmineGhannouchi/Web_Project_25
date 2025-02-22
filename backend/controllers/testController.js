const {pool} = require('../database/connect');

const test = async (req, res) => {
    const [rows] = await pool.execute('SELECT * FROM Compte;');
    res.json(rows);
}

module.exports = {test};