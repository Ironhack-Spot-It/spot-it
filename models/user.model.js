const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    spotifyId: String,
    name: String, 
    email: {
        type: String, 
        unique: true, 
        required: true
    }, 
    //image: String, 
    //privateDates: Object
});

const User = mongoose.model('User', userSchema);
module.exports = User; 