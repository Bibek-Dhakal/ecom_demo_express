const {NODE_ENV} = require("../env");
exports.handle404 = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

exports.handleError = (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = NODE_ENV === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error', {errStatus: err.status || 500});
    console.log(err.message);
    console.log(err.stack);
};