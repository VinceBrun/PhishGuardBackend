"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const email_controller_1 = require("../controllers/email.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/track/open', email_controller_1.emailController.trackOpen);
router.get('/track/click', email_controller_1.emailController.trackClick);
router.get('/verify-smtp', auth_middleware_1.authenticate, auth_middleware_1.requireAdmin, email_controller_1.emailController.verifySmtp);
exports.default = router;
//# sourceMappingURL=email.routes.js.map