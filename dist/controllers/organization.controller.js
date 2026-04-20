"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationController = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const response_1 = require("../utils/response");
const error_middleware_1 = require("../middleware/error.middleware");
exports.organizationController = {
    get: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        if (!req.user?.organizationId) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'No organization found' },
            });
        }
        const org = await database_1.default.organization.findUnique({
            where: { id: req.user.organizationId },
        });
        (0, response_1.sendSuccess)(res, org);
    }),
    update: (0, error_middleware_1.asyncHandler)(async (req, res) => {
        if (!req.user?.organizationId) {
            return res.status(404).json({
                success: false,
                error: { code: 'NOT_FOUND', message: 'No organization found' },
            });
        }
        const { name, logo, primaryColor, secondaryColor, fromEmail, fromName } = req.body;
        const org = await database_1.default.organization.update({
            where: { id: req.user.organizationId },
            data: {
                ...(name && { name }),
                ...(logo && { logo }),
                ...(primaryColor && { primaryColor }),
                ...(secondaryColor && { secondaryColor }),
                ...(fromEmail && { fromEmail }),
                ...(fromName && { fromName }),
            },
        });
        (0, response_1.sendSuccess)(res, org, 'Organization updated successfully');
    }),
};
//# sourceMappingURL=organization.controller.js.map