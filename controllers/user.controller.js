const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user.model');
const spotifyApi = require ('../services/spotify.service');

module.exports.welcome = (req, res, next) => {
    User.findOne({ name: req.params.name })
        .then((user) => {
            if (user) {
                user.getRelations()
                    .then(matches => {
                        res.render('users/welcome', {
                            user: user,
                            matches 
                        });
                    })
                    .catch(error => next(error));
            }
        })
    
};



