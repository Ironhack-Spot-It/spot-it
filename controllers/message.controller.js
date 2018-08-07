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

module.exports.showMessage = (req, res, next) => {
    res.render('');
}