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

  setImg = picsList => {
    return picsList.length ? picsList : "https://thumbs.dreamstime.com/b/icono-masculino-de-la-imagen-del-perfil-del-avatar-del-defecto-placeholder-gris-de-la-foto-del-hombre-88414414.jpg"
  }

  passport.use(new SpotifyStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL || "/auth/spotify/cb"
  },
    function (accessToken, refreshToken, expires_in, profile, next) {
      User.findOne({ 'social.spotifyId': profile.id })
        .then(user => {
          return SpotifyService.getUserData(accessToken, profile.id)
            .then(data => {
              
              if (!user) {
                user = new User({
                  name: profile.username,
                  email: profile.emails[0].value,
                  image: setImg(profile.photos),
                  social: {
                    spotifyId: profile.id
                  }
                })
              }
              user.social.accessToken = accessToken;
              user.social.refreshToken = refreshToken;

              user.topTracks = data.tracks;
              user.playlists = data.playlists;
              user.followingArtists = data.artists;


              let allGenres = data.artists.reduce((acc, artist) => {
                  artist.genres.forEach((genre) => {
                    acc[genre] = acc[genre] || 0;
                    acc[genre]++;
                  })
                  return acc;
              }, {} );

              let favouritesGenres = Object.keys(allGenres).filter((genre) => {
                return allGenres[genre] > 1;
              })

              
              console.log('THESE ARE ALL GENRES: ', favouritesGenres);
              user.favoriteGenres = favouritesGenres;

              return user.save()
                .then(user => next(null, user))
            })
        })
        .catch(error => next(error));
    }));

}

