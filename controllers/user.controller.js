const passport = require('passport');
const User = require('../models/user.model');
const spotifyApi = require ('../services/spotify.service');

module.exports.welcome = (req, res, next) => {
    req.user.getRelations()
        .then(matches => {
            console.log('Sa matao paco', matches);
            res.render('users/welcome', {
                user: req.user,
                matches 
            });
        })
        .catch(error => next(error));
    
};



