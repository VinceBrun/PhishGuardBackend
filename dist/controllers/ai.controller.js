"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiController = void 0;
const ai_service_1 = require("../services/ai.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.aiController = {
    analyze: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { emailText } = req.body;
        if (!emailText || typeof emailText !== 'string' || emailText.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'emailText is required' },
            });
        }
        const result = await ai_service_1.aiService.analyzeEmail(emailText.trim());
        (0, response_1.sendSuccess)(res, result, 'Email analyzed successfully');
    }),
    batchAnalyze: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        const { emails } = req.body;
        if (!Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'emails array is required' },
            });
        }
        if (emails.length > 100) {
            return res.status(400).json({
                success: false,
                error: { code: 'VALIDATION_ERROR', message: 'Maximum 100 emails per batch' },
            });
        }
        const results = await ai_service_1.aiService.batchAnalyze(emails);
        (0, response_1.sendSuccess)(res, results, 'Batch analysis complete');
    }),
    health: (0, error_middleware_1.asyncHandler)(async (_req, res) => {
        const health = await ai_service_1.aiService.checkHealth();
        (0, response_1.sendSuccess)(res, health, 'AI service health status');
    }),
};
//# sourceMappingURL=ai.controller.js.map