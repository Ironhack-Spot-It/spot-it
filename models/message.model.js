const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    body: String,
    //createdAt: new Date()
});

const Msg = mongoose.model('Msg', messageSchema);
module.exports = Msg;