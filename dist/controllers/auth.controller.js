"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.authController = {
    register: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { user, tokens } = await auth_service_1.authService.register(req.body);
        (0, response_1.sendCreated)(res, { user, ...tokens }, 'User registered successfully');
    }),
    login: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { email, password } = req.body;
        const { user, tokens } = await auth_service_1.authService.login(email, password);
        (0, response_1.sendSuccess)(res, { user, ...tokens }, 'Login successful');
    }),
    logout: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (token && req.user) {
            await auth_service_1.authService.logout(req.user.id, token);
        }
        (0, response_1.sendSuccess)(res, null, 'Logout successful');
    }),
    refreshToken: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { refreshToken } = req.body;
        const tokens = await auth_service_1.authService.refreshToken(refreshToken);
        (0, response_1.sendSuccess)(res, tokens, 'Token refreshed successfully');
    }),
    me: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        (0, response_1.sendSuccess)(res, req.user, 'User retrieved successfully');
    }),
    changePassword: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'Current and new passwords are required' },
            });
        }
        await auth_service_1.authService.changePassword(req.user.id, currentPassword, newPassword);
        (0, response_1.sendSuccess)(res, null, 'Password changed successfully');
    }),
};
//# sourceMappingURL=auth.controller.js.map