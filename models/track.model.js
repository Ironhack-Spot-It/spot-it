const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    trackId: String,   
    usersId: [String] 
});

const Track = mongoose.model('Track', trackSchema);
module.exports = Track; 