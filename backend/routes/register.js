const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/compte', registerController.createCompte);
router.post('/coiffeur', registerController.createCoiffeur);
router.post('/client', registerController.createClient);

module.exports = router;