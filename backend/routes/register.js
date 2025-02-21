const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');


//data register coiffeur : nom, prenom, date_de_naissance, tel, email , password , adresse
router.post('/register/coiffeur', registerController.createCoiffeur);

//data register client : nom, prenom, date_de_naissance, tel, email , password
router.post('/register/client', registerController.createClient);

module.exports = router;