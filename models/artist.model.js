const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistId: String,   
    usersId: [String] 
});

const Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist; 