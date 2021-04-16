const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const { isAuth, authRoleNotBasic } = require('../middlewares/auth');



//Create
router.post('/', isAuth, authRoleNotBasic, async (req, res) => {
    const { name, description, picture } = req.body;
    let count;

    try {
        count = await Category.countDocuments({ name: name }).exec();

        if (count > 0) throw { message: 'This category already exists!' };
    } catch (err) {
        return res.status(400).json(err.message);
    }

    const category = new Category({
        name,
        description,
        picture
    });

    try {
        const newCategory = await category.save();
        res.status(201).json('Category successfully created!');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Getting all
router.get('/', async (req, res) => {
    try {
        const  categories =  req.query.list ? 
                    await Category.find({}, 'name').lean().exec() : 
                    await Category.find({}).exec();
                    
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Getting one
router.get('/:id', getCategory, async (req, res) => {
    try {
        res.json(res.category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// Edit one
router.patch('/:id', isAuth, authRoleNotBasic, getCategory, async (req, res) => {
    if (req.body.name) {
        res.category.name = req.body.name;
    }

    if (req.body.description) {
        res.category.name = req.body.description;
    }

    if (req.body.picture) {
        res.category.name = req.body.picture;
    }

    try {
        const updatedCategory = await res.category.save();
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Helper middleware for Getting one with/out articles
async function getCategory(req, res, next) {
    let category;
    const shouldPopulateArticles = req.query.articles == "true" ? true : false;

    try {
        category = shouldPopulateArticles ?
            await Category.findById(req.params.id).populate('articles').execPopulate() :
            await Category.findById(req.params.id).exec();
        if (!category) {
            return res.status(404).json('Cannot find category!')
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.category = category;
    next();
}



module.exports = router;