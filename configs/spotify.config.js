const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();



function getFavoriteArtist(){
        spotifyApi.getFollowedArtists({ limit : 3 })
        .then(function(data) {
        // 'This user is following 1051 artists!'
        console.log('This user is following ', data.body.artists.total, ' artists!');
        }, function(err) {
        console.log('Something went wrong!', err);
        });
    }

// Retrieve an access token and a refresh token
        // spotifyApi.authorizationCodeGrant(user.body).then(
        //     function(data) {
        //       console.log('The token expires in ' + data.body['expires_in']);
        //       console.log('The access token is ' + data.body['access_token']);
        //       console.log('The refresh token is ' + data.body['refresh_token']);
        
        //       // Set the access token on the API object to use it in later calls
        //       spotifyApi.setAccessToken(data.body['access_token']);
        //       spotifyApi.setRefreshToken(data.body['refresh_token']);
        //     },
        //     function(err) {
        //       console.log('Something went wrong!', err);
        //     }
        //   );


// https://www.npmjs.com/package/spotify-web-api-node
// https://doxdox.org/jmperez/spotify-web-api-js


// GET ME
        // spotifyApi.getMe()
        //   .then(function(data) {
        //     console.log('Some information about the authenticated user', data.body);
        //   }, function(err) {
        //     console.log('Something went wrong!', err);
        //   });

//   GET FOLLOWED ARTISTS

        //   spotifyApi.getFollowedArtists({ limit : 1 })
        //   .then(function(data) {
        //     // 'This user is following 1051 artists!'
        //     console.log('This user is following ', data.body.artists.total, ' artists!');
        //   }, function(err) {
        //     console.log('Something went wrong!', err);
        //   });


// REFRESH ACCESS TOKEN

// clientId, clientSecret and refreshToken has been set on the api object previous to this call.
        // spotifyApi.refreshAccessToken().then(
        //     function(data) {
        //       console.log('The access token has been refreshed!');
        
        //       // Save the access token so that it's used in future calls
        //       spotifyApi.setAccessToken(data.body['access_token']);
        //     },
        //     function(err) {
        //       console.log('Could not refresh access token', err);
        //     }
        //   );