const User = require('../models/user.model');
const SpotifyStrategy = require('passport-spotify').Strategy;

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
      callbackURL: "http://localhost:3000/auth/spotify/cb"
    },
    function(accessToken, refreshToken, expires_in, profile, next) {
        debugger;
        console.log('Profile: ', profile);
      // User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
      //   return next(err, user);
      // });
      User.findOne({ spotifyId: profile.id })
        .then(user => {
          if(user) {
            next(null, user);
          }
          else {
            user = new User({
              spotyfyId: profile.id,
              name: profile.username, 
              //email: emails[0].value
            })
            return user.save()
              .then(user => {
                next(null, user);
              });
          }
        })
        .catch(error => next(error));
    }));

}

