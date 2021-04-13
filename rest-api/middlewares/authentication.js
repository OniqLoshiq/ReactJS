const jwt = require('jsonwebtoken');
const { COOKIE_NAME, SECRET } = require('../config');
const BlackListToken = require('../models/BlackListToken');

function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) { reject(err); return; }
            resolve(decoded);
        });
    });
}

module.exports = function () {
    return (req, res, next) => {
        let token = req.cookies[COOKIE_NAME];

        if (token) {
            Promise.all([
                verifyToken(token),
                BlackListToken.findOne({ token })
            ])
                .then(([decoded, blackListToken]) => {
                    if (blackListToken) { return Promise.reject(new Error('blacklisted token')) }
                    req.user = decoded;

                    return next();
                })
                .catch(err => {
                    res.clearCookie(COOKIE_NAME,{sameSite:"none", secure: true});
                    if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                        res.status(401).json('UNAUTHORIZED!');
                        return;
                    }
                });
        } else {
            next();
        }
    }
}