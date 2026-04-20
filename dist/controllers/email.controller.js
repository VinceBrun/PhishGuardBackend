"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailController = void 0;
const email_service_1 = require("../services/email.service");
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.emailController = {
    trackOpen: async (req, res) => {
        const { cid, uid } = req.query;
        if (typeof cid === 'string' && typeof uid === 'string') {
            try {
                await email_service_1.emailService.recordOpen(cid, uid, req.ip, req.get('user-agent'));
            }
            catch {
            }
        }
        const pixel = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/gif',
            'Content-Length': pixel.length,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        });
        res.end(pixel);
    },
    trackClick: async (req, res) => {
        const { cid, uid } = req.query;
        if (typeof cid === 'string' && typeof uid === 'string') {
            try {
                await email_service_1.emailService.recordClick(cid, uid, req.ip, req.get('user-agent'));
            }
            catch {
            }
        }
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
        const trainingUrl = `${frontendUrl}/training/${cid}?uid=${uid}`;
        res.redirect(302, trainingUrl);
    },
    verifySmtp: (0, error_middleware_1.asyncHandler)(async (_req, res) => {
        const isConnected = await email_service_1.emailService.verifyConnection();
        (0, response_1.sendSuccess)(res, { connected: isConnected }, isConnected ? 'SMTP connection verified' : 'SMTP connection failed');
    }),
};
//# sourceMappingURL=email.controller.js.map