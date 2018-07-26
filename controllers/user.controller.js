const passport = require('passport');
const User = require('../models/user.model');
const spotifyApi = require ('../services/spotify.service');

module.exports.welcome = (req, res, next) => {
    spotifyApi.setToken(req);
    res.render('welcome');
};



