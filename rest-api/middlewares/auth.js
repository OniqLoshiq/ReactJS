const ROLE = require('../common/roles');

function isAuth(req, res, next) {
    if (!req.user) {
        return res.status(403).json('You need to sign in!')
    }
    next();
}

function isGuest(req, res, next) {
    if (req.user) {
        return res.status(403).json('You need to log out first!')
    }
    next();
}

function authRoleAdmin(req, res, next) {
    if (req.user.role !== ROLE.ADMIN) {
        return res.status(401).json('Not allowed!');
    }
    next();
}

function authRoleNotBasic(req, res, next) {
    if (req.user.role === ROLE.BASIC) {
        return res.status(401).json('Not allowed!');
    }
    next();
}

module.exports = {
    isAuth,
    isGuest,
    authRoleAdmin,
    authRoleNotBasic
}