const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');
const { BadRequestError, UnauthorizedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('please provide email and password');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthorizedError('invalid credentials');
    }
    
    if (!await user.comparePassword(password)) {
        throw new UnauthorizedError('invalid credentials');
    }

    const token = user.createJWT();
    res.status(StatusCodes.ACCEPTED).json({ user: { name: user.name }, token});
};

module.exports = {
    register,
    login
};
