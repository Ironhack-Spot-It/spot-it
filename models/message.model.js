const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    body: String,
}, { timestamps: true });

const Msg = mongoose.model('Message', messageSchema);
module.exports = Msg;