"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignController = void 0;
const campaign_service_1 = require("../services/campaign.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.campaignController = {
    getAll: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { campaigns, total, page, limit } = await campaign_service_1.campaignService.getAll({
            status: req.query.status,
            search: req.query.search,
            organizationId: req.user?.organizationId,
            page: req.query.page ? parseInt(req.query.page) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        });
        (0, response_1.sendPaginated)(res, campaigns, page, limit, total);
    }),
    getById: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const campaign = await campaign_service_1.campaignService.getById(req.params['id']);
        (0, response_1.sendSuccess)(res, campaign);
    }),
    create: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const campaign = await campaign_service_1.campaignService.create({
            ...req.body,
            organizationId: req.user.organizationId,
        });
        (0, response_1.sendCreated)(res, campaign, 'Campaign created successfully');
    }),
    update: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const campaign = await campaign_service_1.campaignService.update(req.params['id'], req.body);
        (0, response_1.sendSuccess)(res, campaign, 'Campaign updated successfully');
    }),
    delete: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        await campaign_service_1.campaignService.delete(req.params['id']);
        (0, response_1.sendNoContent)(res);
    }),
    launch: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const campaign = await campaign_service_1.campaignService.launch(req.params['id']);
        (0, response_1.sendSuccess)(res, campaign, 'Campaign launched successfully');
    }),
    getResults: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const results = await campaign_service_1.campaignService.getResults(req.params['id']);
        (0, response_1.sendSuccess)(res, results);
    }),
};
//# sourceMappingURL=campaign.controller.js.map