"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = require("./app");
const config_1 = require("./config");
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
const database_1 = require("./utils/database");
const startServer = async () => {
    try {
        await (0, database_1.connectDatabase)();
        const app = (0, app_1.createApp)();
        const server = app.listen(config_1.config.PORT, () => {
            logger_1.default.info(`Server started successfully!`);
            logger_1.default.info(`Environment: ${config_1.config.NODE_ENV}`);
            logger_1.default.info(`Port: ${config_1.config.PORT}`);
            logger_1.default.info(`API Version: ${config_1.config.API_VERSION}`);
            logger_1.default.info(`Health Check: http://localhost:${config_1.config.PORT}/health`);
            logger_1.default.info(`API Base URL: http://localhost:${config_1.config.PORT}/api/${config_1.config.API_VERSION}`);
        });
        const gracefulShutdown = async (signal) => {
            logger_1.default.info(`\n${signal} received, starting graceful shutdown...`);
            server.close(async () => {
                logger_1.default.info('HTTP server closed');
                try {
                    await (0, database_1.disconnectDatabase)();
                    logger_1.default.info('Graceful shutdown completed');
                    process.exit(0);
                }
                catch (error) {
                    logger_1.default.error('Error during graceful shutdown:', error);
                    process.exit(1);
                }
            });
            setTimeout(() => {
                logger_1.default.error('Forced shutdown after timeout');
                process.exit(1);
            }, 30000);
        };
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('uncaughtException', (error) => {
            logger_1.default.error('UNCAUGHT EXCEPTION! Shutting down...');
            logger_1.default.error(error);
            process.exit(1);
        });
        process.on('unhandledRejection', (reason) => {
            logger_1.default.error('UNHANDLED REJECTION! Shutting down...');
            logger_1.default.error(reason);
            process.exit(1);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map