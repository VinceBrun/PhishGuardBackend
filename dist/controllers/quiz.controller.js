"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizController = void 0;
const quiz_service_1 = require("../services/quiz.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.quizController = {
    getAll: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { quizzes, total, page, limit } = await quiz_service_1.quizService.getAll({
            category: req.query.category,
            difficulty: req.query.difficulty,
            page: req.query.page ? parseInt(req.query.page) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit) : undefined,
        });
        (0, response_1.sendPaginated)(res, quizzes, page, limit, total);
    }),
    getById: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const quiz = await quiz_service_1.quizService.getById(req.params['id']);
        (0, response_1.sendSuccess)(res, quiz);
    }),
    create: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const quiz = await quiz_service_1.quizService.create(req.body);
        (0, response_1.sendCreated)(res, quiz, 'Quiz created successfully');
    }),
    submit: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const result = await quiz_service_1.quizService.submitQuiz(req.params['id'], req.user.id, req.body);
        (0, response_1.sendSuccess)(res, result, 'Quiz submitted successfully');
    }),
    getAttempts: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const attempts = await quiz_service_1.quizService.getAttempts(req.user.id);
        (0, response_1.sendSuccess)(res, attempts);
    }),
    getAttemptById: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const attempt = await quiz_service_1.quizService.getAttemptById(req.params['id']);
        (0, response_1.sendSuccess)(res, attempt);
    }),
};
//# sourceMappingURL=quiz.controller.js.map