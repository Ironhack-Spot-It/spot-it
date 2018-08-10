const mongoose = require('mongoose');
const MATCH_LIMIT = 10;

const userSchema = new mongoose.Schema({
    name: String, 
    // email: {
    //     type: String, 
    //     unique: true, 
    //     required: true
    // },
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
        _id: false,
        id: String,
        name: String,
        url: String,
        imgUrl: String, 
        genres: Array
    }],

    topTracks: [{
        _id: false,
        id: String,
        name: String,
        artist: String,
        url: String,
        imgUrl: String
    }],

    playlists:[{
        _id: false,
        id: String,
        name: String,
        url: String,
        imgUrl: String
    }],

    favoriteGenres: [String]
});

userSchema.methods.getRelations = function() {

    //console.log(this.followingArtists);

    return Promise.all([
        this.model('User').find({ followingArtists: { $in: this.followingArtists }, _id: { $ne: this._id }}).limit(MATCH_LIMIT),
        this.model('User').find({ topTracks: { $in: this.topTracks }, _id: { $ne: this._id }}).limit(MATCH_LIMIT), 
        this.model('User').find({ favoriteGenres: { $in: this.favoriteGenres }, 
            _id: { $ne: this._id }
        }).limit(MATCH_LIMIT)
    ])
    .then(([byArtist, byTracks, byGenres]) => {
        return Promise.resolve({
            byArtist: byArtist,
            byTracks: byTracks, 
            byGenres: byGenres
        })
    });

}

userSchema.methods.getFavoriteGenres = function() {
   const allGenres =  this.model('User')
        .find({_id: this._id}, {'followingArtists.genres' : 1, _id: 0})
    
    console.log('TODOS LOS GNEROS: ', allGenres);
}

const User = mongoose.model('User', userSchema);
module.exports = User; 