"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.userController = {
    getAll: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { users, total, page, limit } = await user_service_1.userService.getAll({
            search: req.query.search,
            department: req.query.department,
            role: req.query.role,
            page: req.query.page ? parseInt(req.query.page) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        });
        (0, response_1.sendPaginated)(res, users, page, limit, total);
    }),
    getById: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.userService.getById(req.params['id']);
        (0, response_1.sendSuccess)(res, user);
    }),
    create: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.userService.create({
            ...req.body,
            organizationId: req.user?.organizationId,
        });
        (0, response_1.sendCreated)(res, user, 'User created successfully');
    }),
    update: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const user = await user_service_1.userService.update(req.params['id'], req.body);
        (0, response_1.sendSuccess)(res, user, 'User updated successfully');
    }),
    delete: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        await user_service_1.userService.delete(req.params['id']);
        (0, response_1.sendNoContent)(res);
    }),
    bulkCreate: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const users = await user_service_1.userService.bulkCreate(req.body.users, req.user?.organizationId);
        (0, response_1.sendCreated)(res, { count: users.length, users }, 'Users created successfully');
    }),
    getPerformance: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const performance = await user_service_1.userService.getPerformance(req.params['id']);
        (0, response_1.sendSuccess)(res, performance);
    }),
};
//# sourceMappingURL=user.controller.js.map