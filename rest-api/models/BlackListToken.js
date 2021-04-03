const mongoose = require('mongoose');

const backListToken = new mongoose.Schema({
    token: String
});

module.exports = new mongoose.model('BlackListToken', backListToken);