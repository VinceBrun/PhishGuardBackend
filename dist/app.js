"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const config_1 = require("./config");
const security_middleware_1 = require("./middleware/security.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    app.use(security_middleware_1.helmetMiddleware);
    app.use(security_middleware_1.corsMiddleware);
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
    app.use((0, cookie_parser_1.default)());
    if (config_1.config.isDevelopment) {
        app.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const duration = Date.now() - start;
                logger_1.default.info({
                    method: req.method,
                    url: req.originalUrl,
                    status: res.statusCode,
                    duration: `${duration}ms`,
                    ip: req.ip,
                });
            });
            next();
        });
    }
    app.get('/health', (req, res) => {
        res.json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config_1.config.NODE_ENV,
        });
    });
    app.get('/', (req, res) => {
        res.json({
            name: 'PhishGuard API',
            version: config_1.config.API_VERSION,
            environment: config_1.config.NODE_ENV,
            documentation: `/api/${config_1.config.API_VERSION}/docs`,
            health: '/health',
        });
    });
    const apiPrefix = `/api/${config_1.config.API_VERSION}`;
    app.use(apiPrefix, security_middleware_1.rateLimiter);
    app.use(apiPrefix, routes_1.default);
    app.use(error_middleware_1.notFound);
    app.use(error_middleware_1.errorHandler);
    return app;
};
exports.createApp = createApp;
//# sourceMappingURL=app.js.map