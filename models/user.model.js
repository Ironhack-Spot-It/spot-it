const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String, 
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    image: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/icono-masculino-de-la-imagen-del-perfil-del-avatar-del-defecto-placeholder-gris-de-la-foto-del-hombre-88414414.jpg"
    },
    social: {
        spotifyId: String,
        accessToken: String,
        refreshToken: String
    },

    // followingArtists: [{
    //     id: String,
    //     url: String
    // }],

    topTracks: [{
        name: String,
        url: String,
        imgUrl: String
    }],

    playlists:[{
        name: String,
        url: String,
        imgUrl: String
    }]
});

const User = mongoose.model('User', userSchema);
module.exports = User; 