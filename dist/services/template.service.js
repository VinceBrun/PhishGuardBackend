"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateService = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const errors_1 = require("../utils/errors");
exports.templateService = {
    async getAll(filters) {
        const where = {};
        if (filters.organizationId) {
            where.OR = [
                { organizationId: filters.organizationId },
                { isSystem: true },
            ];
        }
        if (filters.category) {
            where.category = filters.category;
        }
        if (filters.difficulty) {
            where.difficulty = filters.difficulty;
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const [templates, total] = await Promise.all([
            database_1.default.emailTemplate.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    description: true,
                    difficulty: true,
                    category: true,
                    subject: true,
                    isSystem: true,
                    createdAt: true,
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.emailTemplate.count({ where }),
        ]);
        return { templates, total, page, limit };
    },
    async getById(id) {
        const template = await database_1.default.emailTemplate.findUnique({
            where: { id },
        });
        if (!template) {
            throw new errors_1.NotFoundError('Template not found');
        }
        return template;
    },
    async create(data) {
        const template = await database_1.default.emailTemplate.create({
            data: {
                name: data.name,
                description: data.description,
                difficulty: data.difficulty,
                category: data.category,
                subject: data.subject,
                fromName: data.fromName,
                fromEmail: data.fromEmail,
                body: data.body,
                ctaText: data.ctaText,
                ctaUrl: data.ctaUrl,
                redFlags: data.redFlags,
                organizationId: data.organizationId,
                isSystem: false,
            },
        });
        return template;
    },
    async update(id, data) {
        const template = await database_1.default.emailTemplate.update({
            where: { id },
            data: data,
        });
        return template;
    },
    async delete(id) {
        await database_1.default.emailTemplate.delete({
            where: { id },
        });
    },
    async duplicate(id, organizationId) {
        const original = await database_1.default.emailTemplate.findUnique({
            where: { id },
        });
        if (!original) {
            throw new errors_1.NotFoundError('Template not found');
        }
        const duplicate = await database_1.default.emailTemplate.create({
            data: {
                name: `${original.name} (Copy)`,
                description: original.description,
                difficulty: original.difficulty,
                category: original.category,
                subject: original.subject,
                fromName: original.fromName,
                fromEmail: original.fromEmail,
                body: original.body,
                ctaText: original.ctaText,
                ctaUrl: original.ctaUrl,
                redFlags: original.redFlags,
                organizationId,
                isSystem: false,
            },
        });
        return duplicate;
    },
};
//# sourceMappingURL=template.service.js.map