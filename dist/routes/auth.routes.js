"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_middleware_1 = require("../middleware/validate.middleware");
const validation_1 = require("../utils/validation");
const security_middleware_1 = require("../middleware/security.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/register', security_middleware_1.strictRateLimiter, (0, validate_middleware_1.validateBody)(validation_1.registerSchema), auth_controller_1.authController.register);
router.post('/login', security_middleware_1.strictRateLimiter, (0, validate_middleware_1.validateBody)(validation_1.loginSchema), auth_controller_1.authController.login);
router.post('/logout', auth_middleware_1.authenticate, auth_controller_1.authController.logout);
router.post('/refresh', auth_controller_1.authController.refreshToken);
router.get('/me', auth_middleware_1.authenticate, auth_controller_1.authController.me);
router.post('/change-password', auth_middleware_1.authenticate, auth_controller_1.authController.changePassword);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map