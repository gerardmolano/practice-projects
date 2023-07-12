const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../errors');

const login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new UnauthorizedError('please provide credential');
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '30d' });

    res.status(StatusCodes.ACCEPTED).json({ token });
}

module.exports = login;
