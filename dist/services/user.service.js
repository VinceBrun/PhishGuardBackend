"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
const auth_1 = require("../utils/auth");
const errors_1 = require("../utils/errors");
exports.userService = {
    async getAll(filters) {
        const where = {};
        if (filters.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { email: { contains: filters.search, mode: 'insensitive' } },
            ];
        }
        if (filters.department) {
            where.department = filters.department;
        }
        if (filters.role) {
            where.role = filters.role;
        }
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const skip = (page - 1) * limit;
        const [users, total] = await Promise.all([
            database_1.default.user.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    department: true,
                    avatar: true,
                    createdAt: true,
                    lastActiveAt: true,
                },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            database_1.default.user.count({ where }),
        ]);
        return { users, total, page, limit };
    },
    async getById(id) {
        const user = await database_1.default.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                department: true,
                avatar: true,
                organizationId: true,
                createdAt: true,
                lastActiveAt: true,
            },
        });
        if (!user) {
            throw new errors_1.NotFoundError('User not found');
        }
        return user;
    },
    async create(data) {
        const existingUser = await database_1.default.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new errors_1.ConflictError('Email already exists');
        }
        const defaultPassword = await (0, auth_1.hashPassword)('Password123!');
        const user = await database_1.default.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: defaultPassword,
                department: data.department,
                role: data.role || 'USER',
                organizationId: data.organizationId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                department: true,
                createdAt: true,
            },
        });
        return user;
    },
    async update(id, data) {
        const user = await database_1.default.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                department: true,
                avatar: true,
            },
        });
        return user;
    },
    async delete(id) {
        await database_1.default.user.delete({
            where: { id },
        });
    },
    async bulkCreate(users, organizationId) {
        const defaultPassword = await (0, auth_1.hashPassword)('Password123!');
        const createdUsers = await database_1.default.$transaction(users.map((user) => database_1.default.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: defaultPassword,
                department: user.department,
                organizationId,
            },
        })));
        return createdUsers;
    },
    async getPerformance(id) {
        const campaigns = await database_1.default.campaignParticipant.findMany({
            where: { userId: id },
            include: {
                campaign: {
                    select: {
                        name: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        const totalCampaigns = campaigns.length;
        const clickedCount = campaigns.filter((c) => c.isLinkClicked).length;
        const clickRate = totalCampaigns > 0 ? (clickedCount / totalCampaigns) * 100 : 0;
        const quizAttempts = await database_1.default.quizAttempt.findMany({
            where: { userId: id },
            orderBy: { completedAt: 'desc' },
        });
        const averageQuizScore = quizAttempts.length > 0
            ? quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
                quizAttempts.length
            : 0;
        return {
            totalCampaigns,
            clickRate,
            averageQuizScore,
            campaigns: campaigns.map((c) => ({
                id: c.id,
                campaignName: c.campaign.name,
                dateSent: c.emailSentAt,
                emailOpened: c.isEmailOpened,
                linkClicked: c.isLinkClicked,
                quizScore: c.quizScore,
            })),
        };
    },
};
//# sourceMappingURL=user.service.js.map