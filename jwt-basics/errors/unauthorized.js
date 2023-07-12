const CustomError = require('./custom-error');
const { StatusCodes } = require('http-status-codes');

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnauthorizedError;
