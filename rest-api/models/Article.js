const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
    },
    frontPicture: {
        type: String,
        required: true
    },
    videos: [{
        type: String
    }],
    pictures: [{
        type: String
    }],
    likes: {
        type: Number,
        default: 0
    },
    author: {
        type: ObjectId,
        ref: "User"
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    comments: [{
        type: ObjectId,
        ref: "Comment"
    }]
},{ timestamps: true });

articleSchema.virtual('commentsCount').get(function () {
    return this.comments.length;
});

module.exports = mongoose.model('Article', articleSchema);