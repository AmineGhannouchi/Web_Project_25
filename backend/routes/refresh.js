const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');


//get refresh token if already exist in data base (need to login first) (valid 30day) nedd old token
router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;