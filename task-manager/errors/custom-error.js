class CustomError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

const createCustomError = (status, message) => {
    return new CustomError(status, message);
};

module.exports = { createCustomError, CustomError };
