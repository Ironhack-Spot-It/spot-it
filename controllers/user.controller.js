const passport = require('passport');
const User = require('../models/user.model');
const spotifyApi = require ('../services/spotify.service');

module.exports.welcome = (req, res, next) => {
    //console.log('Tu token es: ', req.user.social.accessToken);
    spotifyApi.setUserToken(req.user.social.accessToken);
    res.render('welcome', {
        
    });
};



