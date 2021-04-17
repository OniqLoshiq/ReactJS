const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const { isAuth, authRoleNotBasic } = require('../middlewares/auth');
const Category = require('../models/Category');

// Getting all
router.get('/', async (req, res) => {
    try {
        let articles;

        if (req.query.home) {
            const featuredArticles = await getFeaturedArticles();
            const latestArticles = await getLatestArticles();

            articles = {
                featured: featuredArticles,
                latest: latestArticles
            }
        } else if(req.query.category){
            articles = await Article.find({category: req.query.category}).populate('author', 'username').populate('category', 'name').lean().exec();
        } else {
            articles = await Article.find({}).exec();
        }

        res.json(articles);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Getting all personal
router.get('/personal', isAuth, async (req, res) => {
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
    const { title, subtitle, body, frontPicture, category, author } = req.body;
    const article = new Article({
        title,
        subtitle,
        body,
        frontPicture,
        category,
        author
    });

    try {
        const newArticle = await article.save();
        const updateUser = await User.updateOne({ _id: newArticle.author }, { $push: { articles: newArticle._id } }).exec();
        const updateCategory = await Category.updateOne({ _id: newArticle.category }, { $push: { articles: newArticle._id } }).exec();
        res.status(201).json('Your article has been published');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one
router.patch('/:id', async (req, res) => {
    try{
        let article = await Article.findOne({ _id: req.params.id });

        if (req.body.type) {
            const type = req.body.type;
            const userId = req.body.userId;
            const indexLikes = article.likes.indexOf(userId);
            const indexDisikes = article.dislikes.indexOf(userId);
    
            switch (type) {
                case 'like':
                    if (indexLikes < 0) article.likes.push(req.body.userId);
                    break;
                case 'unlike':
                    if (indexLikes >= 0) article.likes.splice(indexLikes, 1);
                    break;
                case 'like-undislike':
                    if (indexLikes < 0) article.likes.push(req.body.userId);
                    if (indexDisikes >= 0) article.dislikes.splice(indexDisikes, 1)
                    break;
                case 'undislike':
                    if (indexDisikes >= 0) article.dislikes.splice(indexDisikes, 1)
                    break;
                case 'dislike':
                    if (indexDisikes < 0) article.dislikes.push(req.body.userId);
                    break;
                case 'dislike-unlike':
                    if (indexDisikes < 0) article.dislikes.push(req.body.userId);
                    if (indexLikes >= 0) article.likes.splice(indexLikes, 1);
                    break;
                default:
            }
        } else {
            const {title, subtitle, body, frontPicture } = req.body;

            if(article.title !== title) article.title = title;
            if(article.subtitle !== subtitle) article.subtitle = subtitle;
            if(article.body !== body) article.body = body;
            if(article.frontPicture !== frontPicture) article.frontPicture = frontPicture;
        }
    
        article.save();
    
        return res.json('Update successfull')
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
    
});

// Deleting one
router.delete('/:id', isAuth, authRoleNotBasic, async (req, res) => {
    try {
        const removedArticle = await Article.findOneAndDelete({ _id: req.params.id });
        await User.findOneAndUpdate({ _id: removedArticle.category._id }, {
            $pull: {
                'articles': req.params.id
            }
        });

        await Category.findOneAndUpdate({ _id: removedArticle.category._id }, {
            $pull: {
                'articles': req.params.id
            }
        });
        res.json('Article deleted!')
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getArticle(req, res, next) {
    let article;
    try {
        article = await Article.findById(req.params.id)
            .populate('category', 'name')
            .populate('author', 'firstName lastName username profilePicture')
            .lean()
            .exec();

        if (!article) {
            return res.status(404).json('Cannot find article!')
        }


    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.article = article;
    next();
};

const getFeaturedArticles = async () => {
    const articles = await Article
        .aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $project:
                {
                    'title': 1,
                    'subtitle': 1,
                    'frontPicture': 1,
                    'createdAt': 1,
                    'categoryId': '$category._id',
                    'categoryName': '$category.name',
                    'likesCount': { '$size': '$likes' }
                }
            },
            {
                $sort: {
                    'likesCount': -1,
                    'createdAt': -1
                }
            },
            { $limit: 6 }
        ]).exec();

    return articles;
}

const getLatestArticles = async () => {
    // const articles = await Article
    //                     .aggregate([
    //                         {
    //                             $lookup: {
    //                                 from: 'categories',
    //                                 localField: 'category',
    //                                 foreignField: '_id',
    //                                 as: 'category'
    //                             }
    //                         },
    //                         {$unwind: '$category'},
    //                         {
    //                             $project:
    //                             {
    //                                 'title': 1,
    //                                 'subtitle': 1,
    //                                 'frontPicture': 1,
    //                                 'updatedAt': 1,
    //                                 'categoryId': '$category._id',
    //                                 'categoryName': '$category.name',
    //                             }
    //                         },
    //                         {
    //                             $sort: {
    //                                 'updatedAt': -1
    //                             }
    //                         },
    //                         { $limit: 8 }
    //                     ]).exec();

    const articles = await Article
        .find({}, 'title frontPicture createdAt category')
        .sort({ createdAt: -1 })
        .limit(8)
        .populate('category', 'name')
        .lean()
        .exec();

    return articles;
}


module.exports = router;