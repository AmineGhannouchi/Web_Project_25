const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/testController');

router.get('/', logoutController.test);

module.exports = router;