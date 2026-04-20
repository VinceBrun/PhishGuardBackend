"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = exports.notFound = void 0;
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = require("zod");
const errors_1 = require("../utils/errors");
const response_1 = require("../utils/response");
const logger_1 = require("../utils/logger");
const config_1 = require("../config");
const notFound = (req, res) => {
    (0, response_1.sendError)(res, 404, `Route ${req.method} ${req.originalUrl} not found`, 'ROUTE_NOT_FOUND');
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    (0, logger_1.logError)(err, {
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        userAgent: req.get('user-agent'),
    });
    if (err instanceof errors_1.AppError) {
        (0, response_1.sendError)(res, err.statusCode, err.message);
        return;
    }
    if (err instanceof zod_1.ZodError) {
        const errors = err.errors.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
        }));
        (0, response_1.sendError)(res, 422, 'Validation failed', 'VALIDATION_ERROR', errors);
        return;
    }
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        handlePrismaError(err, res);
        return;
    }
    if (err instanceof library_1.PrismaClientValidationError) {
        (0, response_1.sendError)(res, 400, 'Invalid data provided', 'VALIDATION_ERROR');
        return;
    }
    if (err instanceof library_1.PrismaClientInitializationError) {
        (0, response_1.sendError)(res, 503, 'Database connection failed', 'DATABASE_ERROR');
        return;
    }
    if (err.name === 'JsonWebTokenError') {
        (0, response_1.sendError)(res, 401, 'Invalid token', 'INVALID_TOKEN');
        return;
    }
    if (err.name === 'TokenExpiredError') {
        (0, response_1.sendError)(res, 401, 'Token expired', 'TOKEN_EXPIRED');
        return;
    }
    if (!(0, errors_1.isOperationalError)(err)) {
        if (config_1.config.isProduction) {
            (0, response_1.sendError)(res, 500, 'An unexpected error occurred', 'INTERNAL_SERVER_ERROR');
        }
        else {
            (0, response_1.sendError)(res, 500, err.message, 'INTERNAL_SERVER_ERROR', {
                stack: err.stack,
                name: err.name,
            });
        }
        return;
    }
    (0, response_1.sendError)(res, 500, 'An unexpected error occurred', 'INTERNAL_SERVER_ERROR');
};
exports.errorHandler = errorHandler;
const handlePrismaError = (err, res) => {
    switch (err.code) {
        case 'P2002':
            {
                const fields = err.meta?.target || [];
                (0, response_1.sendError)(res, 409, `A record with this ${fields.join(', ')} already exists`, 'DUPLICATE_ENTRY', { fields });
            }
            break;
        case 'P2003':
            (0, response_1.sendError)(res, 400, 'Invalid reference to related record', 'FOREIGN_KEY_CONSTRAINT');
            break;
        case 'P2025':
            (0, response_1.sendError)(res, 404, 'Record not found', 'RECORD_NOT_FOUND');
            break;
        case 'P1000':
            (0, response_1.sendError)(res, 503, 'Database temporarily unavailable', 'DATABASE_OVERLOAD');
            break;
        case 'P1001':
        case 'P1002':
            (0, response_1.sendError)(res, 503, 'Cannot connect to database', 'DATABASE_CONNECTION_ERROR');
            break;
        default:
            (0, response_1.sendError)(res, 500, 'Database operation failed', 'DATABASE_ERROR', config_1.config.isDevelopment ? { code: err.code, meta: err.meta } : undefined);
    }
};
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=error.middleware.js.map