const pool = require('../database/connect');
const bcrypt = require('bcrypt');

// Fonction pour créer un compte général
createCompte = async (req, res) => {
    try {
        const { nom, prenom, date_de_naissance, numero_tel, adresse_email , mot_de_passe} = req.body;

        if (!nom || !prenom || !date_de_naissance || !numero_tel || !adresse_email) {
            return res.status(400).json({ error: 'Tous les champs sont requis.' });
        }
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10)
        const [result] = await pool.execute(
            'INSERT INTO Compte (nom, prenom, date_de_naissance, numero_tel, adresse_email, mot_de_passe) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, date_de_naissance, numero_tel, adresse_email,hashedPassword]
        );
        
        return { id_compte: result.insertId, nom, prenom, date_de_naissance, numero_tel, adresse_email };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du compte.' });
    }
}
// Fonction pour créer un compte coiffeur
createCoiffeur = async (req, res) => {
    try {
        const { id_compte, adresse } = req.body;

        if (!id_compte || !adresse) {
            return res.status(400).json({ error: 'ID du compte et l\'adresse sont requis.' });
        }

        const [result] = await pool.execute(
            'INSERT INTO Compte_Coiffeur (id_compte, adresse) VALUES (?, ?)',
            [id_compte, adresse]
        );
        return { id_compte, adresse };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du coiffeur.' });
    }
}


// Fonction pour créer un compte client
createClient = async (req, res) => {
    try {
        const { id_compte } = req.body;

        if (!id_compte) {
            return res.status(400).json({ error: 'ID du compte est requis.' });
        } 

        const [result] = await pool.execute(
            'INSERT INTO Compte_Client (id_compte) VALUES (?)',
            [id_compte]
        );
        
        return { id_compte };
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du client.' });
    }
}


module.exports = { createCompte, createCoiffeur, createClient };