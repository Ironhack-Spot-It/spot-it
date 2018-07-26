const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String, 
    email: {
        type: String, 
        unique: true, 
        required: true
    },
    social: {
        spotifyId: String,
        accessToken: String,
        refreshToken: String
    }
    //image: String, 
    //privateDates: Object
});

const User = mongoose.model('User', userSchema);
module.exports = User; 