const mongoose = require('mongoose');
const Msg = require('../models/message.model');


module.exports.sendMessage = (req, res, next) => {
    const msg = new Msg({
        from: req.user._id, 
        to: 'cyber_2.0', 
        body: req.body
    });

    console.log('NUESTRO PRIMER MENSAJE: ', msg);

    msg.save();
    res.render('users/inbox')
};

module.exports.showMessages = (req, res, next) => {
    res.render('users/inbox')
}