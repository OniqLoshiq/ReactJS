const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 150
    },
    subtitle: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255
    },
    body: {
        type: String,
        required: true,
        minlength: 20
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
    likes: [{
        type: 'ObjectId',
        ref: "User"
    }],
    dislikes:[{
        type: 'ObjectId',
        ref: "User"
    }],
    author: {
        type: 'ObjectId',
        ref: "User"
    },
    category: {
        type: 'ObjectId',
        ref: "Category"
    },
    comments: [{
        type: 'ObjectId',
        ref: "Comment"
    }]
},{ timestamps: true });

articleSchema.set('toJSON', { virtuals: true });

articleSchema.virtual('commentsCount').get(function () {
    return this.comments.length;
});

articleSchema.virtual('likesCount').get(function () {
    return this.likes.length;
});

articleSchema.virtual('dislikesCount').get(function () {
    return this.dislikes.length;
});

module.exports = mongoose.model('Article', articleSchema);