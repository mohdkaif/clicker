const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    counter: { type: Number, default: 0 },
    prizes: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', userSchema);
