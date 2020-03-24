"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrHandler = ErrHandler;
exports.handleErr = (err, res) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Something went wrong";
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
};
const throwErr = (statusCode, message, next) => {
    const error = new ErrHandler(statusCode, message);
    next(error);
};
exports.default = throwErr;
