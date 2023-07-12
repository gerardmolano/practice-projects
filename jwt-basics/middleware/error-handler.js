const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        res.status(err.status).send(err.message);
    } else {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('something went wrong');
    }
}

module.exports = errorHandler;
