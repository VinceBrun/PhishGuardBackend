"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analytics_controller_1 = require("../controllers/analytics.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.use(auth_middleware_1.requireAdmin);
router.get('/overview', analytics_controller_1.analyticsController.getOverview);
router.get('/department', analytics_controller_1.analyticsController.getDepartmentStats);
router.get('/risk-assessment', analytics_controller_1.analyticsController.getRiskAssessment);
router.get('/trend', analytics_controller_1.analyticsController.getClickRateTrend);
router.get('/template-performance', analytics_controller_1.analyticsController.getTemplatePerformance);
exports.default = router;
//# sourceMappingURL=analytics.routes.js.map