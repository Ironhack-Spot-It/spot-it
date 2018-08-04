const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const messageRoute = require('./message.routes');


router.get('/:name', userController.welcome);
router.get('/:name/message', messageRoute);

module.exports = router;
