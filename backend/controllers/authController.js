const bcrypt = require('bcrypt');
const {pool} = require('../database/connect');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {

    const { email,tel, pwd } = req.body;
    if ((!email && !tel) || !pwd) return res.status(400).json({ 'message': 'mail or phone number and password are required.' });
    
    const [users] =!email ?await pool.execute('SELECT * FROM Compte where numero_tel = ?', [tel || null])
                        :await pool.execute('SELECT * FROM Compte where adresse_email = ?', [email || null]);


    const foundUser = users[0];

    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.mot_de_passe);
    if (match) {
        // create JWTs
        // create JWTs
        const accessToken = jwt.sign(
            { "id_compte": foundUser.id_compte },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
            { "id_compte": foundUser.id_compte },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Saving refreshToken with current user
        const [rows] = await pool.execute('SELECT * FROM refresh_tokens WHERE id_compte = ?', [foundUser.id_compte]);
        if (rows.length) {
            await pool.execute('UPDATE refresh_tokens SET refresh_token = ? WHERE id_compte = ?', [refreshToken, foundUser.id_compte]);
        } else {
            await pool.execute('INSERT INTO refresh_tokens (id_compte, refresh_token) VALUES (?, ?)', [foundUser.id_compte, refreshToken]);
        }


        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };