const { StatusCodes } = require('http-status-codes');
const { Error } = require('mongoose');

const errorHandler = (error, req, res, next) => {
    let customError = {
        status: error.status || StatusCodes.INTERNAL_SERVER_ERROR,
        message: error.message || 'something went wrong'
    };

    if (error.code && error.code == 11000) {
        customError.status = StatusCodes.BAD_REQUEST;
        customError.message = `please choose another ${Object.keys(error.keyValue)}`;
    }

    if (error instanceof Error.ValidationError) {
        customError.status = StatusCodes.BAD_REQUEST;
        customError.message = Object.values(error.errors).map(item => item.message).join(', ');
    }

    if (error instanceof Error.CastError) {
        customError.status = StatusCodes.NOT_FOUND;
        customError.message = 'resource not found'
    }
    
    res.status(customError.status).json({ message: customError.message });
};

module.exports = errorHandler;
