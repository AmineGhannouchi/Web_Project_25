const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


//data register coiffeur : nom, prenom, date_de_naissance, tel, email , password , adresse
router.post('/compte/coiffeur', registerController.createCoiffeur);

//data register client : nom, prenom, date_de_naissance, tel, email , password
router.post('/compte/client', registerController.createClient);

module.exports = router;