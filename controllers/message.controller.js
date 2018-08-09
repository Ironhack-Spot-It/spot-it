const mongoose = require('mongoose');
const Msg = require('../models/message.model');
const User = require('../models/user.model');
const moment = require('moment');


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
                //let senders = allMessages.map((msg)=> msg.from);
                let senders = allMessages.map((msg)=> msg.from);

                let allSenders = senders.filter((item, pos) =>
                    senders.indexOf(item) == pos);

                let prueba = allSenders.map((sender) => {
                    return User.find({name: sender}, {image: 1, name: 1})
                                .then(s => {
                                    console.log(s);
                                })
                                .catch(error => next(error));
                });
                console.log(prueba);
    
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
    Msg.find({$or: [{ from: req.params.sender, to: req.user.name}, {from: req.user.name, to: req.params.sender}]})
        .then (messages => {

            console.log('SENDER: ', messages)

            res.render('users/message', {
                message: messages
            })
            
        })
        .catch(error => {
            next(error)
        });

    } else { res.redirect('/');
} }

