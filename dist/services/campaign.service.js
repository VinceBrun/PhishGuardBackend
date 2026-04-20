"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignService = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const errors_1 = require("../utils/errors");
exports.campaignService = {
    async getAll(filters) {
        const where = {};
        if (filters.organizationId) {
            where.organizationId = filters.organizationId;
        }
        if (filters.status && filters.status !== 'all') {
            where.status = filters.status;
        }
        if (filters.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const [campaigns, total] = await Promise.all([
            database_1.default.campaign.findMany({
                where,
                include: {
                    template: {
                        select: {
                            name: true,
                            difficulty: true,
                        },
                    },
                    _count: {
                        select: {
                            participants: true,
                        },
                    },
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.campaign.count({ where }),
        ]);
        const campaignsWithStats = await Promise.all(campaigns.map(async (campaign) => {
            const stats = await database_1.default.campaignParticipant.aggregate({
                where: { campaignId: campaign.id },
                _count: {
                    isEmailOpened: true,
                    isLinkClicked: true,
                },
            });
            const participants = campaign._count.participants;
            const openRate = participants > 0 ? (stats._count.isEmailOpened / participants) * 100 : 0;
            const clickRate = participants > 0 ? (stats._count.isLinkClicked / participants) * 100 : 0;
            return {
                ...campaign,
                recipients: participants,
                openRate,
                clickRate,
            };
        }));
        return { campaigns: campaignsWithStats, total, page, limit };
    },
    async getById(id) {
        const campaign = await database_1.default.campaign.findUnique({
            where: { id },
            include: {
                template: true,
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                department: true,
                            },
                        },
                    },
                },
            },
        });
        if (!campaign) {
            throw new errors_1.NotFoundError('Campaign not found');
        }
        return campaign;
    },
    async create(data) {
        const campaign = await database_1.default.campaign.create({
            data: {
                name: data.name,
                description: data.description,
                templateId: data.templateId,
                organizationId: data.organizationId,
                scheduledAt: data.scheduledAt,
                status: data.scheduledAt ? 'SCHEDULED' : 'DRAFT',
                participants: {
                    create: data.recipientIds.map((userId) => ({
                        userId,
                    })),
                },
            },
            include: {
                template: true,
                _count: {
                    select: {
                        participants: true,
                    },
                },
            },
        });
        return campaign;
    },
    async update(id, data) {
        const campaign = await database_1.default.campaign.update({
            where: { id },
            data,
        });
        return campaign;
    },
    async delete(id) {
        await database_1.default.campaign.delete({
            where: { id },
        });
    },
    async launch(id) {
        const campaign = await database_1.default.campaign.update({
            where: { id },
            data: {
                status: 'ACTIVE',
                launchedAt: new Date(),
            },
        });
        await database_1.default.campaignParticipant.updateMany({
            where: { campaignId: id },
            data: {
                emailSentAt: new Date(),
                isEmailSent: true,
            },
        });
        return campaign;
    },
    async getResults(id) {
        const campaign = await database_1.default.campaign.findUnique({
            where: { id },
            include: {
                participants: {
                    include: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                                department: true,
                            },
                        },
                    },
                },
            },
        });
        if (!campaign) {
            throw new errors_1.NotFoundError('Campaign not found');
        }
        return campaign;
    },
};
//# sourceMappingURL=campaign.service.js.map