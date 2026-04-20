"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const organization_controller_1 = require("../controllers/organization.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.use(auth_middleware_1.requireAdmin);
router.get('/', organization_controller_1.organizationController.get);
router.patch('/', organization_controller_1.organizationController.update);
exports.default = router;
//# sourceMappingURL=organization.routes.js.map