const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.post('/', passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'user-read-recently-played', 'user-top-read', 'user-read-birthdate'] }));

router.get('/spotify/cb', authController.loginCallback);

module.exports = router;