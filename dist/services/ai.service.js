"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiService = void 0;
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const AI_API_URL = process.env['AI_API_URL'] || 'http://localhost:8000';
exports.aiService = {
    async analyzeEmail(emailText) {
        const response = await fetch(`${AI_API_URL}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email_text: emailText }),
        });
        if (!response.ok) {
            const errorBody = await response.text();
            logger_1.default.error(`AI service error: ${response.status} - ${errorBody}`);
            throw new Error(`AI analysis failed: ${response.statusText}`);
        }
        return response.json();
    },
    async batchAnalyze(emails) {
        const response = await fetch(`${AI_API_URL}/batch-analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emails.map((email_text) => ({ email_text }))),
        });
        if (!response.ok) {
            throw new Error(`AI batch analysis failed: ${response.statusText}`);
        }
        const data = await response.json();
        return data.results;
    },
    async checkHealth() {
        try {
            const response = await fetch(`${AI_API_URL}/health`);
            if (!response.ok) {
                return { status: 'unhealthy', models_loaded: false };
            }
            return response.json();
        }
        catch {
            return { status: 'unreachable', models_loaded: false };
        }
    },
};
//# sourceMappingURL=ai.service.js.map