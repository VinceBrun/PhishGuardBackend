"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDatabaseQuery = exports.logSecurityEvent = exports.logError = exports.logRequest = exports.stream = void 0;
const tslib_1 = require("tslib");
const winston_1 = tslib_1.__importDefault(require("winston"));
const path_1 = tslib_1.__importDefault(require("path"));
const NODE_ENV = process.env.NODE_ENV || 'development';
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_FILE_PATH = process.env.LOG_FILE_PATH || 'logs/app.log';
const LOG_ERROR_FILE_PATH = process.env.LOG_ERROR_FILE_PATH || 'logs/error.log';
const isProduction = NODE_ENV === 'production';
const isDevelopment = NODE_ENV === 'development';
const customFormat = winston_1.default.format.printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}]: ${message}`;
    if (Object.keys(metadata).length > 0) {
        msg += ` ${JSON.stringify(metadata)}`;
    }
    return msg;
});
const transports = [
    new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(isProduction ? winston_1.default.format.uncolorize() : winston_1.default.format.colorize(), winston_1.default.format.simple(), customFormat),
    }),
];
if (!isProduction) {
    transports.push(new winston_1.default.transports.File({
        filename: path_1.default.join(process.cwd(), LOG_FILE_PATH),
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    }), new winston_1.default.transports.File({
        filename: path_1.default.join(process.cwd(), LOG_ERROR_FILE_PATH),
        level: 'error',
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    }));
}
const logger = winston_1.default.createLogger({
    level: LOG_LEVEL,
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),
    defaultMeta: { service: 'phishguard-backend' },
    transports,
    exitOnError: false,
});
exports.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};
const logRequest = (req, res, duration) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('user-agent'),
    });
};
exports.logRequest = logRequest;
const logError = (error, context) => {
    logger.error({
        message: error.message,
        stack: error.stack,
        ...context,
    });
};
exports.logError = logError;
const logSecurityEvent = (event, details) => {
    logger.warn({
        type: 'SECURITY_EVENT',
        event,
        ...details,
    });
};
exports.logSecurityEvent = logSecurityEvent;
const logDatabaseQuery = (query, params) => {
    if (isDevelopment) {
        logger.debug({
            type: 'DATABASE_QUERY',
            query,
            params,
        });
    }
};
exports.logDatabaseQuery = logDatabaseQuery;
exports.default = logger;
//# sourceMappingURL=logger.js.map