const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config');
const ROLE = require('../common/roles');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
		minlength: 2,
        maxlength: 15
    },
    lastName: {
        type: String,
        required: true,
		minlength: 2,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 15
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    dateOfBirth: {
        type: Date,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: [ROLE.ADMIN, ROLE.MODERATOR, ROLE.BASIC],
        default: ROLE.BASIC
    },
    articles: [{
        type: 'ObjectId',
        ref: "Article"
    }]
}, { timestamps: { createdAt: 'registeredAt' } });


userSchema.set('toJSON', { virtuals: true });

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});

userSchema.virtual('articlesCount').get(function () {
    return this.articles.length;
});

userSchema.methods.verifyPassword = async function (password) {
    const passwordMatch = await bcrypt.compare(password, this.password);

    return passwordMatch;
}

userSchema.pre('save', async function (err, user, next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(+config.SALT_ROUNDS);
            try {
                this.password = await bcrypt.hash(this.password, salt);
                next();
            } catch (err) {
                console.error(err);
                throw new Error('Server Error');
            }
        } catch (err) {
            console.error(err);
            throw new Error('Server Error');
        }
        return;
    }
    next();
});


module.exports = mongoose.model('User', userSchema);