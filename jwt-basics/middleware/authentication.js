const jwt = require('jsonwebtoken');
const { UnauthorizedError, BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('please provide credentials');
    }

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const { username } = payload;
        req.user = { username };
    } catch (err) {
        throw new BadRequestError('not authorized to acccess this route');
    }

    next();
};

module.exports = authentication;
