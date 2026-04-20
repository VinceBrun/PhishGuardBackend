"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ai_controller_1 = require("../controllers/ai.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post('/analyze', ai_controller_1.aiController.analyze);
router.post('/batch-analyze', ai_controller_1.aiController.batchAnalyze);
router.get('/health', ai_controller_1.aiController.health);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map