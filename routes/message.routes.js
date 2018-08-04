const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');



router.post('/', messageController.sendMessage);
router.get('/', messageController.showMessages);

module.exports = router;
