"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseHealth = exports.disconnectDatabase = exports.connectDatabase = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const logger_1 = tslib_1.__importStar(require("./logger"));
const config_1 = require("../config");
const prismaClientSingleton = () => {
    return new client_1.PrismaClient({
        log: config_1.config.isDevelopment
            ? [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'error' },
                { emit: 'event', level: 'warn' },
            ]
            : [{ emit: 'event', level: 'error' }],
    });
};
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (config_1.config.isDevelopment) {
    globalThis.prismaGlobal = prisma;
}
if (config_1.config.isDevelopment) {
    prisma.$on('query', (e) => {
        (0, logger_1.logDatabaseQuery)(e.query, e.params);
    });
}
prisma.$on('error', (e) => {
    logger_1.default.error('Database error:', e);
});
prisma.$on('warn', (e) => {
    logger_1.default.warn('Database warning:', e);
});
const connectDatabase = async () => {
    try {
        await prisma.$connect();
        logger_1.default.info('Database connected successfully');
    }
    catch (error) {
        logger_1.default.error('Database connection failed:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await prisma.$disconnect();
        logger_1.default.info('Database disconnected successfully');
    }
    catch (error) {
        logger_1.default.error('Database disconnection failed:', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
const checkDatabaseHealth = async () => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch (error) {
        logger_1.default.error('Database health check failed:', error);
        return false;
    }
};
exports.checkDatabaseHealth = checkDatabaseHealth;
exports.default = prisma;
//# sourceMappingURL=database.js.map