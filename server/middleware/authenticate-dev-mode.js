const {NODE_ENV} = require("../env");

exports.authenticateDevMode = (req, res, next) => {
    if (NODE_ENV !== 'development') {
        return res.status(403).send('Forbidden');
    }
    next();
};