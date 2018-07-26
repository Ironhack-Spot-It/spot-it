const passport = require('passport');
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();

module.exports.welcome = (req, res, next) => {
    console.log('Esti es la mejor ----->', req.body);
    res.render('welcome');
};



