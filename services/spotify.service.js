const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: '/auth/spotify/cb'
});

spotifyApi.getUserData = function (accessToken, userId) {
    this.setAccessToken(accessToken);

    return Promise.all([
        this.getUserPlaylists(userId),
        this.getMyTopTracks(),
        // this.getMyTopArtists()
        this.getFollowedArtists()
    ]).then(promises => {
        const playlist = promises[0].body.items
            .map((playlist) => {
                return {
                    id: playlist.id,
                    name: playlist.name,
                    url: playlist.uri,
                    imgUrl: playlist.images[0].url
                }
            });
        const tracks = promises[1].body.items
            .map((track) => {
                //console.log('TRACKS ', track.artists);
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    url: track.external_urls.spotify,
                    imgUrl: track.album.images[0].url
                }
            });
        const artists = promises[2].body.artists.items
            .map((artist) => {
                // console.log('MY TOP ARTISTS ', artist);
                return {
                    id: artist.id,
                    name: artist.name, 
                    url: artist.external_urls.spotify,
                    genres: artist.genres,
                    imgUrl: artist.images[0].url
                }
            })
        return Promise.resolve({
            tracks: tracks,
            playlists: playlist,
            artists: artists
        })
    });
}
module.exports = spotifyApi;

