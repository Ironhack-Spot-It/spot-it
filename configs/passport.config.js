const User = require('../models/user.model');
const SpotifyStrategy = require('passport-spotify').Strategy;

module.exports.setup = (passport) => {

    passport.use(new SpotifyStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/spotify/cb"
      },
      function(accessToken, refreshToken, expires_in, profile, next) {
          debugger;
          console.log('Profile: ', profile);
        User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
          return next(err, user);
        });
      }));

}

