"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaign_controller_1 = require("../controllers/campaign.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', campaign_controller_1.campaignController.getAll);
router.post('/', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.createCampaignSchema), campaign_controller_1.campaignController.create);
router.get('/:id', campaign_controller_1.campaignController.getById);
router.patch('/:id', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.updateCampaignSchema), campaign_controller_1.campaignController.update);
router.delete('/:id', auth_middleware_1.requireAdmin, campaign_controller_1.campaignController.delete);
router.post('/:id/launch', auth_middleware_1.requireAdmin, campaign_controller_1.campaignController.launch);
router.get('/:id/results', auth_middleware_1.requireAdmin, campaign_controller_1.campaignController.getResults);
exports.default = router;
//# sourceMappingURL=campaign.routes.js.map