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
        //console.log('Profile: ', profile);
      console.log('Aquí sucede la magia:',accessToken, refreshToken, expires_in);
      console.log('Profile --> ', profile)
      User.findOne({ spotifyId: profile.id })
        .then(user => {
          console.log('Entro aquí: ', user);
          if(user) {
            next(null, user);
          }
          else {
            user = new User({
              spotifyId: profile.id,
              name: profile.username, 
              email: profile.emails[0].value
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

