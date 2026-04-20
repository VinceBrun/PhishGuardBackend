"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const auth_1 = require("../utils/auth");
const errors_1 = require("../utils/errors");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
exports.authService = {
    async register(data) {
        const existingUser = await database_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new errors_1.ConflictError('Email already registered');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(data.password);
        let organization;
        if (data.organizationName) {
            organization = await database_1.default.organization.create({
                data: { name: data.organizationName },
            });
        }
        const user = await database_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: organization ? 'ADMIN' : 'USER',
                organizationId: organization?.id,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                organizationId: true,
            },
        });
        const tokens = (0, auth_1.generateTokenPair)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        await database_1.default.session.create({
            data: {
                userId: user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
        logger_1.default.info(`User registered: ${user.email}`);
        return { user, tokens };
    },
    async login(email, password) {
        const user = await database_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const isValidPassword = await (0, auth_1.comparePassword)(password, user.password);
        if (!isValidPassword) {
            throw new errors_1.UnauthorizedError('Invalid credentials');
        }
        const tokens = (0, auth_1.generateTokenPair)({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        await database_1.default.session.create({
            data: {
                userId: user.id,
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
        await database_1.default.user.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() },
        });
        logger_1.default.info(`User logged in: ${user.email}`);
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                organizationId: user.organizationId,
            },
            tokens,
        };
    },
    async logout(userId, token) {
        await database_1.default.session.deleteMany({
            where: {
                userId,
                token,
            },
        });
        logger_1.default.info(`User logged out: ${userId}`);
    },
    async refreshToken(oldRefreshToken) {
        const session = await database_1.default.session.findUnique({
            where: { token: oldRefreshToken },
        });
        if (!session || session.expiresAt < new Date()) {
            throw new errors_1.UnauthorizedError('Invalid or expired refresh token');
        }
        const user = await database_1.default.user.findUnique({
            where: { id: session.userId },
            select: { email: true, role: true },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('Invalid or expired refresh token');
        }
        const tokens = (0, auth_1.generateTokenPair)({
            userId: session.userId,
            email: user.email,
            role: user.role,
        });
        await database_1.default.session.update({
            where: { id: session.id },
            data: {
                token: tokens.refreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            },
        });
        return tokens;
    },
    async changePassword(userId, currentPassword, newPassword) {
        const user = await database_1.default.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new errors_1.UnauthorizedError('User not found');
        }
        const isValidPassword = await (0, auth_1.comparePassword)(currentPassword, user.password);
        if (!isValidPassword) {
            throw new errors_1.UnauthorizedError('Current password is incorrect');
        }
        const hashedPassword = await (0, auth_1.hashPassword)(newPassword);
        await database_1.default.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        logger_1.default.info(`Password changed for user: ${user.email}`);
    },
};
//# sourceMappingURL=auth.service.js.map