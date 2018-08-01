const mongoose = require('mongoose');
const MATCH_LIMIT = 10;

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

    followingArtists: [{
        id: String,
        name: String,
        url: String,
        imgUrl: String, 
        genres: Array, 
        matches: [String]
    }],

    topTracks: [{
        id: String,
        name: String,
        artist: String,
        url: String,
        imgUrl: String, 
        matches: [String]
    }],

    playlists:[{
        id: String,
        name: String,
        url: String,
        imgUrl: String,
        matches: [String]
    }]
});

userSchema.methods.getRelations = function() {
    console.log('FOLLOW', this);
    return Promise.all([
        this.model('User')
            .find( { _id: { $ne: this._id }, 'followingArtists.id': { $in: this.followingArtists.map(artist => artist.id) } }, {_id: 1})
            .limit(MATCH_LIMIT)
    ]).then(promises => {
        console.log('LAS PROMESAS SON:', promises)
        return Promise.resolve({
            matchArtist: promises[0]
        })
    });


    // return this.model('User')
    // .find( {'followingArtists.id': this.followingArtists.id }, {_id: 1})
    // .limit(MATCH_LIMIT)
}

const User = mongoose.model('User', userSchema);
module.exports = User; 