const ROLE = require('../common/roles');

module.exports = (req, res, next) => {
    if(req.params.id === req.user._id || req.user.role === ROLE.ADMIN){
        return next();
    }

    return res.status(401).json('Not allowed!');
}