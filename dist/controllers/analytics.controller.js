"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = void 0;
const analytics_service_1 = require("../services/analytics.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.analyticsController = {
    getOverview: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const overview = await analytics_service_1.analyticsService.getOverview(req.user?.organizationId);
        (0, response_1.sendSuccess)(res, overview);
    }),
    getDepartmentStats: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const stats = await analytics_service_1.analyticsService.getDepartmentStats(req.user?.organizationId);
        (0, response_1.sendSuccess)(res, stats);
    }),
    getRiskAssessment: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const assessment = await analytics_service_1.analyticsService.getRiskAssessment(req.user?.organizationId);
        (0, response_1.sendSuccess)(res, assessment);
    }),
    getClickRateTrend: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const days = req.query.days ? parseInt(req.query.days) : 30;
        const trend = await analytics_service_1.analyticsService.getClickRateTrend(req.user?.organizationId, days);
        (0, response_1.sendSuccess)(res, trend);
    }),
    getTemplatePerformance: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const data = await analytics_service_1.analyticsService.getTemplatePerformance(req.user?.organizationId);
        (0, response_1.sendSuccess)(res, data);
    }),
};
//# sourceMappingURL=analytics.controller.js.map