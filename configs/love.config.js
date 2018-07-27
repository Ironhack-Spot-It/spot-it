
// Get the NO authenticated user

spotifyApi.getUser('petteralexis')
  .then(function(data) {
    console.log('Some information about this user', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });