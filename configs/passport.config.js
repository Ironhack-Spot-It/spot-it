const User = require('../models/user.model');
const SpotifyStrategy = require('passport-spotify').Strategy;
const SpotifyService = require('../services/spotify.service');

module.exports.setup = (passport) => {

  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => {
        next(null, user);
      })
      .catch(error => next(error));
  });

  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/auth/spotify/cb"
  },
    function (accessToken, refreshToken, expires_in, profile, next) {
      //console.log('Profile: ', profile);
      console.log('Aquí sucede la magia:', accessToken, refreshToken, expires_in);
      console.log('Profile --> ', profile)
      User.findOne({ 'social.spotifyId': profile.id })
        .then(user => {
          return SpotifyService.getUserData(accessToken, profile.id)
            .then(data => {
              console.log(data);
              console.log('Entro aquí: ', user);
              if (!user) {
                user = new User({
                  name: profile.username,
                  email: profile.emails[0].value,
                  social: {
                    spotifyId: profile.id
                  }
                })
              }
              user.social.accessToken = accessToken;
              user.social.refreshToken = refreshToken;
              user.traks = data.traks;
              return user.save()
                .then(user => next(null, user))
            })
        })
        .catch(error => next(error));
    }));

}

