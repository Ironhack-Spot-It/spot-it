const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const messageController = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth.middleware');



router.get('/:name',
    authMiddleware.isAuthenticated,
    userController.welcome);

router.post('/:name/messages',
    authMiddleware.isAuthenticated,
    messageController.sendMessage);

router.get('/:name/messages', 
    authMiddleware.isAuthenticated,
    messageController.showInbox);

//TODO FIX THIS BULLSHIT
router.get(`/cyber_2.0/messages/estita`,
    authMiddleware.isAuthenticated,
    messageController.showMessage);

module.exports = router;
