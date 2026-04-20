"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSameOrganization = exports.optionalAuth = exports.requireUser = exports.requireAdmin = exports.authenticate = void 0;
const tslib_1 = require("tslib");
const errors_1 = require("../utils/errors");
const auth_1 = require("../utils/auth");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const logger_1 = require("../utils/logger");
const authenticate = async (req, res, next) => {
    try {
        const token = (0, auth_1.extractTokenFromHeader)(req.headers.authorization);
        if (!token) {
            throw new errors_1.UnauthorizedError('No authentication token provided');
        }
        const payload = (0, auth_1.verifyAccessToken)(token);
        const user = await database_1.default.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                role: true,
                organizationId: true,
                lastActiveAt: true,
            },
        });
        if (!user) {
            (0, logger_1.logSecurityEvent)('INVALID_TOKEN_USER_NOT_FOUND', {
                userId: payload.userId,
                ip: req.ip,
            });
            throw new errors_1.UnauthorizedError('User not found');
        }
        database_1.default.user.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() },
        }).catch(() => {
        });
        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            organizationId: user.organizationId || undefined,
        };
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authenticate = authenticate;
const requireAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Authentication required');
        }
        if (req.user.role !== 'ADMIN') {
            (0, logger_1.logSecurityEvent)('UNAUTHORIZED_ADMIN_ACCESS_ATTEMPT', {
                userId: req.user.id,
                role: req.user.role,
                path: req.path,
                ip: req.ip,
            });
            throw new errors_1.ForbiddenError('Admin access required');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireAdmin = requireAdmin;
const requireUser = (req, res, next) => {
    try {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Authentication required');
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireUser = requireUser;
const optionalAuth = async (req, res, next) => {
    try {
        const token = (0, auth_1.extractTokenFromHeader)(req.headers.authorization);
        if (token) {
            const payload = (0, auth_1.verifyAccessToken)(token);
            const user = await database_1.default.user.findUnique({
                where: { id: payload.userId },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    organizationId: true,
                },
            });
            if (user) {
                req.user = {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    organizationId: user.organizationId || undefined,
                };
            }
        }
        next();
    }
    catch (error) {
        next();
    }
};
exports.optionalAuth = optionalAuth;
const requireSameOrganization = (organizationIdParam = 'organizationId') => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                throw new errors_1.UnauthorizedError('Authentication required');
            }
            const requestedOrgId = req.params[organizationIdParam] || req.body?.organizationId;
            if (req.user.role === 'ADMIN' && req.user.organizationId) {
                if (requestedOrgId && requestedOrgId !== req.user.organizationId) {
                    (0, logger_1.logSecurityEvent)('CROSS_ORGANIZATION_ACCESS_ATTEMPT', {
                        userId: req.user.id,
                        userOrgId: req.user.organizationId,
                        requestedOrgId,
                        path: req.path,
                        ip: req.ip,
                    });
                    throw new errors_1.ForbiddenError('Access denied to this organization');
                }
            }
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.requireSameOrganization = requireSameOrganization;
//# sourceMappingURL=auth.middleware.js.map