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
router.get('/:name/messages/:sender',
    authMiddleware.isAuthenticated,
    messageController.showMessage);



// LOGOUT

// router.get('/delete', userController.delete);

// router.post('/:name/delete', 
//     authMiddleware.isAuthenticated,
//     userController.doDelete);

module.exports = router;
