"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRateLimiter = exports.apiRateLimiter = exports.strictRateLimiter = exports.rateLimiter = exports.corsMiddleware = exports.helmetMiddleware = void 0;
const tslib_1 = require("tslib");
const express_rate_limit_1 = tslib_1.__importDefault(require("express-rate-limit"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const config_1 = require("../config");
const errors_1 = require("../utils/errors");
exports.helmetMiddleware = (0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
        },
    },
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
    },
});
exports.corsMiddleware = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        const allowedOrigins = config_1.config.CORS_ORIGIN.split(',').map((o) => o.trim());
        if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['X-Total-Count', 'X-Total-Pages'],
    maxAge: 86400,
});
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.RATE_LIMIT_WINDOW_MS,
    max: config_1.config.RATE_LIMIT_MAX_REQUESTS,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new errors_1.RateLimitError('Too many requests, please try again later');
    },
});
exports.strictRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many attempts, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new errors_1.RateLimitError('Too many login attempts, please try again in 15 minutes');
    },
    skipSuccessfulRequests: true,
});
exports.apiRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: 'API rate limit exceeded',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new errors_1.RateLimitError('API rate limit exceeded, please try again later');
    },
});
exports.uploadRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 10,
    message: 'Too many file uploads',
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        throw new errors_1.RateLimitError('Upload limit exceeded, please try again later');
    },
});
//# sourceMappingURL=security.middleware.js.map