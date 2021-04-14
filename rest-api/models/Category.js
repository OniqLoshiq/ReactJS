const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 25
    },
    description: {
        type: String,
        required: true,
        minlength: 15,
        maxlength: 250
    },
    picture: {
        type: String,
        required: true
    },
    articles: [{
        type: 'ObjectId',
        ref: 'Article'
    }]
});

categorySchema.set('toJSON', { virtuals: true });

categorySchema.virtual('articlesCount').get(function () {
    return this.articles.length;
});


module.exports = mongoose.model('Category', categorySchema);