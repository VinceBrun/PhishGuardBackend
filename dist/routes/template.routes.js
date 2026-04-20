"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const template_controller_1 = require("../controllers/template.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', template_controller_1.templateController.getAll);
router.post('/', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.createTemplateSchema), template_controller_1.templateController.create);
router.get('/:id', template_controller_1.templateController.getById);
router.patch('/:id', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.updateTemplateSchema), template_controller_1.templateController.update);
router.delete('/:id', auth_middleware_1.requireAdmin, template_controller_1.templateController.delete);
router.post('/:id/duplicate', auth_middleware_1.requireAdmin, template_controller_1.templateController.duplicate);
exports.default = router;
//# sourceMappingURL=template.routes.js.map