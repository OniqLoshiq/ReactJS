const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 250
    },
    author: {
        type: 'ObjectId',
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);