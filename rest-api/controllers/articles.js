const express = require('express');
const router = express.Router();

const Article = require('../models/Article');

// Getting all
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Getting all personal
router.get('/personal', async(req, res) => {
    try {
        const articles = await Article.find(a => a.author === req.user.Id);
        require.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one
router.get('/:id', getArticle, (req, res) => {
    res.json(req.article);
});

// Creating one
router.post('/:id', getArticle, async (req, res) => {
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
        res.status(201).json(newArticle);
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
        res.json({ message: 'Article deleted!' })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getArticle(req, res, next) {
    let article;
    try {
        article = await Article.findById(req.params.id);
        if (!article) {
            res.status(404).json({ message: 'Cannot find article!' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    req.article = article;
    next();
};


module.exports = router;