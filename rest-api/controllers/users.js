const express = require('express');
const router = express.Router();
const { isAuth, isGuest, authRoleAdmin, authRoleNotBasic } = require('../middlewares/auth');
const { COOKIE_NAME } = require('../config');
const BlackListToken = require('../models/BlackListToken');
const usersService = require('../services/usersService');
const permission = require('../middlewares/permissions');

//Register
router.post('/register', isGuest, async(req,res) => {
    try{
        const createdUser = await usersService.register(req.body);

        res.status(201).json('You have successfully registered');
    } catch (err) {
        if(err.message.endsWith('is already taken!')){
            return res.status(400).json(err.message);
        }
        console.log(err);
        res.status(500).json({message: err.message});
    }
});

//Sing in
router.post('/signin', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try{
        const [user, token] = await usersService.singIn(username, password);
        const credentials = usersService.getCredentials(user);

        res.cookie(COOKIE_NAME, token, {sameSite:"none", secure: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 5))});
        res.json(credentials);
    } catch (err){
        res.status(401).json(err.message);
    }
})

//Logout
router.post('/logout', isAuth, (req, res) => {
    const token = req.cookies[COOKIE_NAME];
    BlackListToken.create({ token })
        .then(() => {
            res.clearCookie(COOKIE_NAME, {sameSite:"none", secure: true});
            res.json('You have successfully logged out!')
        }).catch(err => {
            res.status(500).json({ message: err.message });
        })
});

//Get credentials
router.get('/auth', async(req,res) => {
    if(req.user){
        const user = await usersService.getOne(req.user._id);
        const credentials = usersService.getCredentials(user);

        return res.json(credentials);
    }

    res.json('Not signed in')
})

//Getting all
router.get('/', isAuth, authRoleAdmin, async (req, res) =>{
    try{    
        const users = await usersService.getAll();
        res.json(users);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

//Getting one
router.get('/:id', isAuth, permission, async (req, res) => {
    try{
        const user = await usersService.getOne(req.params.id);
        res.json(user);
    } catch (err){
        res.status(500).json({ message: err.message });
    }
});

//Editing one


module.exports = router;