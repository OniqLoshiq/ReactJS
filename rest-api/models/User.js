const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
        maxlength: 12
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
    articles: [{ type: ObjectId, ref: "Article" }]
},{ timestamps: { createdAt: 'registeredAt' } });

userSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
});


module.exports = mongoose.model('User', userSchema);