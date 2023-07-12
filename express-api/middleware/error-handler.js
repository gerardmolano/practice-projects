const { CustomError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError) {
        return res.status(error.status).send(error.messaage);
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('someting went wrong');
};

module.exports = errorHandler;
