"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const quiz_controller_1 = require("../controllers/quiz.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const validate_middleware_1 = require("../middleware/validate.middleware");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', quiz_controller_1.quizController.getAll);
router.post('/', auth_middleware_1.requireAdmin, (0, validate_middleware_1.validateBody)(validation_1.createQuizSchema), quiz_controller_1.quizController.create);
router.get('/attempts', quiz_controller_1.quizController.getAttempts);
router.get('/attempts/:id', quiz_controller_1.quizController.getAttemptById);
router.get('/:id', quiz_controller_1.quizController.getById);
router.post('/:id/submit', (0, validate_middleware_1.validateBody)(validation_1.submitQuizSchema), quiz_controller_1.quizController.submit);
exports.default = router;
//# sourceMappingURL=quiz.routes.js.map