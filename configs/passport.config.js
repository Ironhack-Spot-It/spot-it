//const SpotifyStrategy = require('passport-spotify').Strategy;

// passport.use(new SpotifyStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/spotify/callback"
//   },
//   function(accessToken, refreshToken, expires_in, profile, done) {
//     User.findOrCreate({ spotifyId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
//));