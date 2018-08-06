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

module.exports.showMessages = (req, res, next) => {
    Msg.find({ to: req.user.name})
        .then(allMessages => {
            console.log('MENSAHITOOOO', allMessages);
            const senders = allMessages.map((msg)=> {
                return msg.from
            })

            const allSenders = senders.filter(function(item, pos) {
                return senders.indexOf(item) == pos;
            })

            console.log(allSenders);

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