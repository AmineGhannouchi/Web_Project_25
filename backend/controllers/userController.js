const {pool} = require('../database/connect');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.execute('SELECT * FROM Compte;');
        return res.status(200).json({ success: true, data: users });
    } catch (error) {
        
        return res.status(500).json({ success: false, message: 'Erreur lors de la recherche des utilisateurs.', error: error.message });
    }
}
const updateUser = async (req, res) => {
    try {
        const [user] = await pool.execute('SELECT * FROM Compte WHERE id_compte = ?;', [req.params.id]);
        if (!user[0]) {
            return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
        }
        //recupere nom prenom date de naissance tel email
        const nom = req.body.nom || user[0].nom;
        const prenom = req.body.prenom || user[0].prenom;
        const date_de_naissance = req.body.date_de_naissance || user[0].date_de_naissance;
        const numero_tel = req.body.numero_tel || user[0].numero_tel;
        const adresse_email = req.body.adresse_email || user[0].adresse_email;

        //mise a jour
        pool.execute('UPDATE Compte SET nom = ?, prenom = ?, date_de_naissance = ?, numero_tel = ?, adresse_email = ? WHERE id_compte = ?;', [nom, prenom, date_de_naissance, numero_tel, adresse_email, req.params.id]);


        
        return res.status(200).json({ success: true, message: 'Compte mis à jour avec succès.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Erreur lors de la mise à jour.', error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        await pool.execute('DELETE FROM Compte WHERE id_compte = ?;', [req.params.id]);

        if(req.user.role === 'coiffeur'){
            await pool.execute('DELETE FROM Compte_Coiffeur WHERE id_compte = ?;', [req.params.id]);
        }else if(req.user.role === 'client'){
            await pool.execute('DELETE FROM Compte_Client WHERE id_compte = ?;', [req.params.id]);
        }

        return res.status(200).json({ success: true, message: 'Compte supprimé avec succès.' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erreur lors de la suppression.', error: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const [user] = await pool.execute('SELECT * FROM Compte WHERE id_compte = ?;', [req.params.id]);
        if (!user[0]) {
            return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
        }
        return res.status(200).json({ success: true, data: user[0] });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Erreur lors de la recherche de l\'utilisateur.', error: error.message });
    }
}

module.exports = {getAllUsers, updateUser, deleteUser, getUser};