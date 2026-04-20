"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateController = void 0;
const template_service_1 = require("../services/template.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.templateController = {
    getAll: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { templates, total, page, limit } = await template_service_1.templateService.getAll({
            category: req.query.category,
            difficulty: req.query.difficulty,
            organizationId: req.user?.organizationId,
            page: req.query.page ? parseInt(req.query.page) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        });
        (0, response_1.sendPaginated)(res, templates, page, limit, total);
    }),
    getById: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const template = await template_service_1.templateService.getById(req.params['id']);
        (0, response_1.sendSuccess)(res, template);
    }),
    create: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const template = await template_service_1.templateService.create({
            ...req.body,
            organizationId: req.user?.organizationId,
        });
        (0, response_1.sendCreated)(res, template, 'Template created successfully');
    }),
    update: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const template = await template_service_1.templateService.update(req.params['id'], req.body);
        (0, response_1.sendSuccess)(res, template, 'Template updated successfully');
    }),
    delete: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        await template_service_1.templateService.delete(req.params['id']);
        (0, response_1.sendNoContent)(res);
    }),
    duplicate: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const template = await template_service_1.templateService.duplicate(req.params['id'], req.user?.organizationId);
        (0, response_1.sendCreated)(res, template, 'Template duplicated successfully');
    }),
};
//# sourceMappingURL=template.controller.js.map