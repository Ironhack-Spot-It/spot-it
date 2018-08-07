const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const messageController = require('../controllers/message.controller');



router.get('/:name', userController.welcome);

router.post('/:name/messages', messageController.sendMessage);
router.get('/:name/messages', messageController.showInbox);

//TODO FIX THIS BULLSHIT
router.get(`/cyber_2.0/messages/cyber_2.0`, messageController.showMessage);

module.exports = router;
