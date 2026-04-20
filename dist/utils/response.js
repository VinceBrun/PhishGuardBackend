"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responses = exports.sendPaginated = exports.sendError = exports.sendNoContent = exports.sendCreated = exports.sendSuccess = void 0;
const sendSuccess = (res, data, message, statusCode = 200, metadata) => {
    const response = {
        success: true,
        data,
    };
    if (message) {
        response.message = message;
    }
    if (metadata) {
        response.metadata = metadata;
    }
    return res.status(statusCode).json(response);
};
exports.sendSuccess = sendSuccess;
const sendCreated = (res, data, message = 'Resource created successfully') => {
    return (0, exports.sendSuccess)(res, data, message, 201);
};
exports.sendCreated = sendCreated;
const sendNoContent = (res) => {
    return res.status(204).send();
};
exports.sendNoContent = sendNoContent;
const sendError = (res, statusCode, message, code, details) => {
    const response = {
        success: false,
        error: {
            code: code || `ERROR_${statusCode}`,
            message,
            ...(details && { details }),
        },
    };
    return res.status(statusCode).json(response);
};
exports.sendError = sendError;
const sendPaginated = (res, data, page, limit, total, message) => {
    const totalPages = Math.ceil(total / limit);
    return (0, exports.sendSuccess)(res, data, message, 200, {
        page,
        limit,
        total,
        totalPages,
    });
};
exports.sendPaginated = sendPaginated;
exports.responses = {
    ok: (res, data, message) => (0, exports.sendSuccess)(res, data, message, 200),
    created: (res, data, message) => (0, exports.sendCreated)(res, data, message),
    noContent: (res) => (0, exports.sendNoContent)(res),
    badRequest: (res, message = 'Bad request', details) => (0, exports.sendError)(res, 400, message, 'BAD_REQUEST', details),
    unauthorized: (res, message = 'Unauthorized') => (0, exports.sendError)(res, 401, message, 'UNAUTHORIZED'),
    forbidden: (res, message = 'Forbidden') => (0, exports.sendError)(res, 403, message, 'FORBIDDEN'),
    notFound: (res, message = 'Resource not found') => (0, exports.sendError)(res, 404, message, 'NOT_FOUND'),
    conflict: (res, message = 'Resource already exists') => (0, exports.sendError)(res, 409, message, 'CONFLICT'),
    validationError: (res, message = 'Validation failed', errors) => (0, exports.sendError)(res, 422, message, 'VALIDATION_ERROR', errors),
    tooManyRequests: (res, message = 'Too many requests') => (0, exports.sendError)(res, 429, message, 'RATE_LIMIT_EXCEEDED'),
    serverError: (res, message = 'Internal server error') => (0, exports.sendError)(res, 500, message, 'INTERNAL_SERVER_ERROR'),
};
//# sourceMappingURL=response.js.map