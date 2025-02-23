const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/all', userController.getAllUsers);
// router.post('/', userController.createUser);

router.get('/:id', userController.getUser);

//needed data : nom, prenom, date_de_naissance, numero_tel, adresse_email
router.put('/:id/update', userController.updateUser);
router.delete('/:id/delete', userController.deleteUser);

module.exports = router;