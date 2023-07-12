class CustomError extends Error {
    constructor(messaage) {
        super(messaage);
    }
}

module.exports = CustomError;
