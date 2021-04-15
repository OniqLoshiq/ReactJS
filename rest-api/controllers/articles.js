const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const { isAuth, authRoleNotBasic } = require('../middlewares/auth');

// Getting all
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find({}).exec();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Getting all personal
router.get('/personal', isAuth, async(req, res) => {
    try {
        const articles = await Article.find(a => a.author === req.user.Id).exec();
        require.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one
router.get('/:id', getArticle, (req, res) => {
    res.json(res.article);
});

// Creating one
router.post('/', isAuth, async (req, res) => {
    const { title, description, frontPicture, categoryId, authorId } = req.body;
    const article = new Article({
        title,
        description,
        frontPicture,
        categoryId,
        authorId
    });

    try {
        const newArticle = await article.save();
        const updateUser = await User.updateOne({_id: newArticle.author}, {$push: {articles: newArticle._id}}).exec();
        res.status(201).json('Your article has been published');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', getArticle, (req, res) => {

});

// Deleting one
router.delete('/:id', getArticle, async (req, res) => {
    try {
        await req.article.remove();
        res.json('Article deleted!')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getArticle(req, res, next) {
    let article;
    try {
        article = await Article.findById(req.params.id).exec();
        if (!article) {
            return res.status(404).json('Cannot find article!')
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.article = article;
    next();
};


module.exports = router;