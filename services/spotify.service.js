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
        this.getMyTopTracks()
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
                return {
                    id: track.id,
                    name: track.name,
                    url: track.external_urls.spotify,
                    imgUrl: track.album.images[0].url
                }
            });
        console.log(playlist);
        return Promise.resolve({
            tracks: tracks,
            playlists: playlist
        })
    });
}
module.exports = spotifyApi;
