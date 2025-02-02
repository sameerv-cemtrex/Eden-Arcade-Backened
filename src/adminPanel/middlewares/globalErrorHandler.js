const globalErrorHandler = (err, req, res, next) => {
    //status
    //message
    //stack
    const stack = err.stack;
    const message = err.message;
    const status = err.status ? err.status : false;
    const statusCode = err.statusCode ? err.statusCode : 500;

    res.status(statusCode).json({
        status,
        code: statusCode,
        message,
        stack,
    });
};

//not found error handler
const notFoundError = (req, res, next) => {
    const err = new Error(`Can't find the ${req.originalUrl} on the server`)
    next(err)
}


module.exports = { globalErrorHandler, notFoundError };