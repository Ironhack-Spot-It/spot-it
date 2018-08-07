const mongoose = require('mongoose');
const Msg = require('../models/message.model');


module.exports.sendMessage = (req, res, next) => {
    const msg = new Msg({
        from: req.user.name,
        to: req.params.name,
        body: req.body.message
    });

    console.log('BODY MESSAGE: ', req.params);

    msg.save();
  res.redirect(`/user/${req.user.name}/messages`);
};

module.exports.showInbox = (req, res, next) => {
    if (req.user.name === req.params.name) {
        Msg.find({ to: req.user.name})
            .then(allMessages => {
                let senders = allMessages.map((msg)=> msg.from);
                let allSenders = senders.filter((item, pos) =>
                    senders.indexOf(item) == pos);
    
                res.render('users/inbox', 
                { 
                    messages: allMessages,
                    senders: allSenders,
                    user: req.user
                })
            })
            .catch(error => {
                next(error)
            })
    }
    else {
        //TODO: ¿A dónde le redirigimos?
        res.redirect('/');
    }
}

module.exports.showMessage = (req, res, next) => {
    if (req.params.name === req.user.name) {
    // console.log('params: ', req.params);   
    // console.log('user', req.user);
    Msg.find({$or: [{ from: req.params.sender, to: req.user.name}, {from: req.user.name, to: req.params.sender}]})
        .then (messages => {
            console.log('HAY SUERTE??: ', messages)
            res.render('users/message', {
                message: messages
            })
            
        })
        .catch(error => {
            next(error)
        });

    } else { res.redirect('/');
} }

