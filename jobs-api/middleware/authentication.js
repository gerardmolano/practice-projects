const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('authentication failed');
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: payload.userId, name: payload.name };
        next();
    } catch(error) {
        throw new UnauthorizedError('authentication failed');
    }
};

module.exports = authenticationMiddleware;
