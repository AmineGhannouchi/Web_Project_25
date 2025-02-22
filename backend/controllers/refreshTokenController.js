
const {pool} = require('../database/connect');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    
    const [user]= await pool.execute('SELECT * FROM Compte WHERE id_compte is(SELECT id_compte FROM refresh_tokens WHERE refresh_token = ?)', [refreshToken]);

    const foundUser = user[0];
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.id_compte !== decoded.id_compte) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "id_compte": decoded.id_compte },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }