const errorHandler = (err, req, res, next) => {
    const error = new Error();
    error.statuscode = err.status || 500;
    error.message = err.message || "Internal server error";
    res.status(error.statuscode).json({ success: false, message: error.message });
    return next();
}

module.exports = errorHandler;