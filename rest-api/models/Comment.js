const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 150
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    author: {
        type: ObjectId,
        ref: "User"
    },
    article: {
        type: ObjectId,
        ref: "Article"
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);