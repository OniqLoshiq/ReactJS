const jwt = require('jsonwebtoken');
const { SECRET } = require('../config');
const User = require('../models/User');
const ROLE = require('../common/roles');

async function getUserByUsername(username) {
    let user = await User.findOne({ username: username });

    return user;
}

async function isFirstUser(){
    let count = await User.countDocuments({});

    return count < 1;
}

module.exports = {
    async singIn(username, password) {
        const user = await getUserByUsername(username);

        if (!user) throw { message: 'Password or username does not match!' }

        const isPasswordMatch = await user.verifyPassword(password);

        if (!isPasswordMatch) throw { message: 'Password or username does not match!' }

        const token = jwt.sign({ _id: user.id, role: user.role }, SECRET);

        return [user, token];
    },

    async register(data) {
        let count;

        try {
            count = await User.countDocuments({ username: data.username});
            
            if(count > 0) throw { message: 'Username is already taken!' }; 
        } catch (err) {
            throw { message: err.message } 
        }

        try {
            count = await User.countDocuments({ email: data.email });
            if(count > 0) throw { message: 'Email is already taken!' } 
        } catch (err) {
            throw { message: err.message } 
        }

        const user = new User({...data});
        
        let isFirst = await isFirstUser();

        if(isFirst) {
            user.role = ROLE.ADMIN;
        }

        return user.save();
    },

    async getAll(search) {
        if(search) {
            let regex = new RegExp(search,'i');
            const users = await User.find({ $or: [{username: regex },{firstName: regex}, {lastName: regex}, {email: regex}] });
            return users;
        }

        const users = await User.find({});

        return users;
    },

    async getOne(id){
        const user = await User.findOne({_id: id});

        return user;
    },

    async updateRole(userId, newRole){
        const result = await User.findOneAndUpdate({_id: userId}, {role: newRole});
        return result;
    },

    getCredentials(user){
        const credentials = Object.create({});
        credentials.id = user._id;
        credentials.email = user.email;
        credentials.profilePicture = user.profilePicture;
        credentials.username = user.username;
        credentials.role = user.role;

        return credentials;
    }
}
