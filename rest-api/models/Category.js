const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
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