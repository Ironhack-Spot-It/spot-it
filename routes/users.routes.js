const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const messageController = require('../controllers/message.controller');



router.get('/:name', userController.welcome);

router.post('/:name/messages', messageController.sendMessage);
router.get('/:name/messages', messageController.showMessages);

module.exports = router;
