const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    playlistId: String,   
    usersId: [String] 
});

const Playlist = mongoose.model('Playlist', playlistSchema);
module.exports = Playlist; 