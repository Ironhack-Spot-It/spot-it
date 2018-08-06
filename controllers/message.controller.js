const mongoose = require('mongoose');
const Msg = require('../models/message.model');


module.exports.sendMessage = (req, res, next) => {
    const msg = new Msg({
        from: req.user._id,
        to: 'cyber_2.0',
        body: req.body.message
    });

    console.log('NUESTRO PRIMER MENSAJE: ', msg);

    msg.save();
  res.redirect(`/user/${req.user.name}/messages`);
};

module.exports.showMessages = (req, res, next) => {
    Msg.find({ to: req.user.name})
        .then(allMessages => {
            console.log('MENSAHITOOOO', allMessages);
            res.render('users/inbox', 
            { 
                messages: allMessages,
                user: req.user
            })
        })
        .catch(error => {
            next(error)
        })
}