const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const dashboard = (req, res) => {
    res.status(StatusCodes.ACCEPTED).send(`hello ${req.user.username} from dashboard`);
};

module.exports = dashboard;
