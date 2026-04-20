"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', auth_middleware_1.requireAdmin, user_controller_1.userController.getAll);
router.post('/', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.createUserSchema), user_controller_1.userController.create);
router.post('/bulk-upload', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.bulkUploadUsersSchema), user_controller_1.userController.bulkCreate);
router.get('/:id', user_controller_1.userController.getById);
router.patch('/:id', (0, validate_middleware_1.validateBody)(validation_1.updateUserSchema), user_controller_1.userController.update);
router.delete('/:id', auth_middleware_1.requireAdmin, user_controller_1.userController.delete);
router.get('/:id/performance', user_controller_1.userController.getPerformance);
exports.default = router;
//# sourceMappingURL=user.routes.js.map