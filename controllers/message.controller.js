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
        Msg.find({ to: req.user.name })
            .then(allMessages => {
                //let senders = allMessages.map((msg)=> msg.from);
                const senderNames = allMessages.map((msg) => msg.from);

                User.find({ name: { $in: senderNames } })
                    .then((users) => {
                        res.render('users/inbox', {
                            senders: users,
                            user: req.user
                        })

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
        Msg.find({ $or: [{ from: req.params.sender, to: req.user.name }, { from: req.user.name, to: req.params.sender }] })
            .then(messages => {

                User.find({ name: req.user.name })
                    .then((sender) => {
                        console.log('holi', sender[0].name)
                        res.render('users/message', {
                            sender: sender[0],
                            message: messages
                        })

                    })

                console.log('SENDER: ', messages)


            })
            .catch(error => {
                next(error)
            });

    } else {
        res.redirect('/');
    }
}

