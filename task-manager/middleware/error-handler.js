const { Error : ValidationError } = require('mongoose');
const { CustomError } = require('../errors/custom-error');

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.status).json({ message: err.message });
    }

    if (err instanceof ValidationError) {
        const message = Object.keys(err.errors)
            .map(field => err.errors[field].message)
            .join(', ');
            
        return res.status(401).json({ message });
    }
    
    res.status(500).send('something went wrong');
}

module.exports = errorHandler;
