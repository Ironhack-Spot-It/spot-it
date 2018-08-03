const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const Msg = require('../models/message.model');
const spotifyApi = require ('../services/spotify.service');

module.exports.welcome = (req, res, next) => {
    req.user.getRelations()
        .then(matches => {
            //console.log('Sa matao paco', matches);
            res.render('users/welcome', {
                user: req.user,
                matches 
            });
        })
        .catch(error => next(error));
    
};

module.exports.sendMessage = (req, res, next) => {
    const msg = new Msg({
        from: req.user._id, 
        to: 'cyber_2.0', 
        body: req.body
    });

    console.log('NUESTRO PRIMER MENSAJE: ', msg);

    msg.save();
    res.render('hola')
};


