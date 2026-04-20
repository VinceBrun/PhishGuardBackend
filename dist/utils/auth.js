"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordStrength = exports.generateRandomToken = exports.extractTokenFromHeader = exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokenPair = exports.generateRefreshToken = exports.generateAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const errors_1 = require("./errors");
const hashPassword = async (password) => {
    return bcryptjs_1.default.hash(password, config_1.config.BCRYPT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_SECRET, {
        expiresIn: config_1.config.JWT_EXPIRES_IN,
        issuer: 'phishguard-api',
        audience: 'phishguard-app',
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.config.JWT_REFRESH_SECRET, {
        expiresIn: config_1.config.JWT_REFRESH_EXPIRES_IN,
        issuer: 'phishguard-api',
        audience: 'phishguard-app',
    });
};
exports.generateRefreshToken = generateRefreshToken;
const generateTokenPair = (payload) => {
    return {
        accessToken: (0, exports.generateAccessToken)(payload),
        refreshToken: (0, exports.generateRefreshToken)(payload),
    };
};
exports.generateTokenPair = generateTokenPair;
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET, {
            issuer: 'phishguard-api',
            audience: 'phishguard-app',
        });
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new errors_1.UnauthorizedError('Token has expired');
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new errors_1.UnauthorizedError('Invalid token');
        }
        throw new errors_1.UnauthorizedError('Token verification failed');
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.JWT_REFRESH_SECRET, {
            issuer: 'phishguard-api',
            audience: 'phishguard-app',
        });
        return decoded;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new errors_1.UnauthorizedError('Refresh token has expired');
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new errors_1.UnauthorizedError('Invalid refresh token');
        }
        throw new errors_1.UnauthorizedError('Refresh token verification failed');
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) {
        return null;
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }
    return parts[1];
};
exports.extractTokenFromHeader = extractTokenFromHeader;
const generateRandomToken = () => {
    return require('crypto').randomBytes(32).toString('hex');
};
exports.generateRandomToken = generateRandomToken;
const validatePasswordStrength = (password) => {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.push('Password must contain at least one special character');
    }
    return {
        isValid: errors.length === 0,
        errors,
    };
};
exports.validatePasswordStrength = validatePasswordStrength;
//# sourceMappingURL=auth.js.map