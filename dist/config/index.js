"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.config = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
class Config {
    NODE_ENV;
    PORT;
    API_VERSION;
    DATABASE_URL;
    JWT_SECRET;
    JWT_EXPIRES_IN;
    JWT_REFRESH_SECRET;
    JWT_REFRESH_EXPIRES_IN;
    BCRYPT_ROUNDS;
    RATE_LIMIT_WINDOW_MS;
    RATE_LIMIT_MAX_REQUESTS;
    CORS_ORIGIN;
    SMTP_HOST;
    SMTP_PORT;
    SMTP_SECURE;
    SMTP_USER;
    SMTP_PASSWORD;
    FROM_EMAIL;
    FROM_NAME;
    LOG_LEVEL;
    LOG_FILE_PATH;
    LOG_ERROR_FILE_PATH;
    FRONTEND_URL;
    BACKEND_URL;
    MAX_FILE_SIZE;
    UPLOAD_DIR;
    SESSION_SECRET;
    SESSION_TIMEOUT;
    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || 'development';
        this.PORT = parseInt(process.env.PORT || '3001', 10);
        this.API_VERSION = process.env.API_VERSION || 'v1';
        this.DATABASE_URL = this.getEnvVar('DATABASE_URL');
        this.JWT_SECRET = this.getEnvVar('JWT_SECRET');
        this.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
        this.JWT_REFRESH_SECRET = this.getEnvVar('JWT_REFRESH_SECRET');
        this.JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';
        this.BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10);
        this.RATE_LIMIT_WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10);
        this.RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10);
        this.CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
        this.SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
        this.SMTP_PORT = parseInt(process.env.SMTP_PORT || '587', 10);
        this.SMTP_SECURE = process.env.SMTP_SECURE === 'true';
        this.SMTP_USER = process.env.SMTP_USER || '';
        this.SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
        this.FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@phishguard.com';
        this.FROM_NAME = process.env.FROM_NAME || 'PhishGuard Security';
        this.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
        this.LOG_FILE_PATH = process.env.LOG_FILE_PATH || 'logs/app.log';
        this.LOG_ERROR_FILE_PATH = process.env.LOG_ERROR_FILE_PATH || 'logs/error.log';
        this.FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
        this.BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${this.PORT}`;
        this.MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880', 10);
        this.UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
        this.SESSION_SECRET = process.env.SESSION_SECRET || this.JWT_SECRET;
        this.SESSION_TIMEOUT = parseInt(process.env.SESSION_TIMEOUT || '86400000', 10);
        this.validate();
    }
    getEnvVar(key) {
        const value = process.env[key];
        if (!value) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
        return value;
    }
    validate() {
        if (this.PORT < 1 || this.PORT > 65535) {
            throw new Error('PORT must be between 1 and 65535');
        }
        if (this.NODE_ENV === 'production') {
            if (this.JWT_SECRET.length < 32) {
                throw new Error('JWT_SECRET must be at least 32 characters in production');
            }
            if (this.JWT_REFRESH_SECRET.length < 32) {
                throw new Error('JWT_REFRESH_SECRET must be at least 32 characters in production');
            }
        }
    }
    get isProduction() {
        return this.NODE_ENV === 'production';
    }
    get isDevelopment() {
        return this.NODE_ENV === 'development';
    }
    get isTest() {
        return this.NODE_ENV === 'test';
    }
}
exports.Config = Config;
exports.config = new Config();
//# sourceMappingURL=index.js.map