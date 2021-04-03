const express = require('express');
const router = express.Router();

const usersController = require('./controllers/users');
const articlesController = require('./controllers/articles');
const categoriesController = require('./controllers/categories');
const commentsController = require('./controllers/comments');

router.use('/api/users', usersController);
router.use('/api/articles', articlesController);
router.use('/api/categories', categoriesController);
router.use('/api/comments', commentsController);

router.all('*', (req, res) => {
    res.status(404).json({message: 'Page not found!'});
})

module.exports = router;