"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const tslib_1 = require("tslib");
const database_1 = tslib_1.__importDefault(require("../utils/database"));
exports.analyticsService = {
    async getOverview(organizationId) {
        const where = organizationId ? { organizationId } : {};
        const [totalUsers, totalCampaigns, activeCampaigns] = await Promise.all([
            database_1.default.user.count({ where: { ...where, role: 'USER' } }),
            database_1.default.campaign.count({ where }),
            database_1.default.campaign.count({ where: { ...where, status: 'ACTIVE' } }),
        ]);
        const participants = await database_1.default.campaignParticipant.findMany({
            where: organizationId ? { campaign: { organizationId } } : {},
        });
        const totalEmails = participants.length;
        const clickedEmails = participants.filter((p) => p.isLinkClicked).length;
        const overallClickRate = totalEmails > 0 ? (clickedEmails / totalEmails) * 100 : 0;
        const quizAttempts = await database_1.default.quizAttempt.findMany({
            where: organizationId ? { user: { organizationId } } : {},
        });
        const averageQuizScore = quizAttempts.length > 0
            ? quizAttempts.reduce((sum, attempt) => sum + attempt.score, 0) /
                quizAttempts.length
            : 0;
        return {
            totalUsers,
            totalCampaigns,
            activeCampaigns,
            overallClickRate,
            averageQuizScore,
            totalEmailsSent: totalEmails,
        };
    },
    async getDepartmentStats(organizationId) {
        const where = organizationId ? { organizationId } : {};
        const users = await database_1.default.user.findMany({
            where: { ...where, role: 'USER', department: { not: null } },
            select: {
                department: true,
                campaignParticipations: { select: { isLinkClicked: true } },
                quizAttempts: { select: { score: true } },
            },
        });
        const departmentMap = new Map();
        users.forEach((user) => {
            const dept = user.department;
            if (!departmentMap.has(dept)) {
                departmentMap.set(dept, { users: 0, clicks: 0, total: 0, quizScores: [] });
            }
            const deptData = departmentMap.get(dept);
            deptData.users++;
            deptData.total += user.campaignParticipations.length;
            deptData.clicks += user.campaignParticipations.filter((p) => p.isLinkClicked).length;
            deptData.quizScores.push(...user.quizAttempts.map((a) => a.score));
        });
        return Array.from(departmentMap.entries()).map(([name, data]) => ({
            name,
            userCount: data.users,
            clickRate: data.total > 0 ? (data.clicks / data.total) * 100 : 0,
            averageQuizScore: data.quizScores.length > 0
                ? data.quizScores.reduce((sum, score) => sum + score, 0) / data.quizScores.length
                : 0,
        }));
    },
    async getRiskAssessment(organizationId) {
        const where = organizationId ? { organizationId } : {};
        const users = await database_1.default.user.findMany({
            where: { ...where, role: 'USER' },
            select: {
                id: true,
                name: true,
                email: true,
                department: true,
                campaignParticipations: { select: { isLinkClicked: true } },
                quizAttempts: { select: { score: true } },
            },
        });
        const usersWithRisk = users.map((user) => {
            const totalCampaigns = user.campaignParticipations.length;
            const clicks = user.campaignParticipations.filter((p) => p.isLinkClicked).length;
            const clickRate = totalCampaigns > 0 ? (clicks / totalCampaigns) * 100 : 0;
            const avgQuizScore = user.quizAttempts.length > 0
                ? user.quizAttempts.reduce((sum, a) => sum + a.score, 0) /
                    user.quizAttempts.length
                : 0;
            let riskLevel;
            if (clickRate > 50 || avgQuizScore < 50) {
                riskLevel = 'HIGH';
            }
            else if (clickRate > 25 || avgQuizScore < 70) {
                riskLevel = 'MEDIUM';
            }
            else {
                riskLevel = 'LOW';
            }
            return {
                userId: user.id,
                name: user.name,
                email: user.email,
                department: user.department,
                clickRate,
                averageQuizScore: avgQuizScore,
                riskLevel,
            };
        });
        return {
            summary: {
                highRisk: usersWithRisk.filter((u) => u.riskLevel === 'HIGH').length,
                mediumRisk: usersWithRisk.filter((u) => u.riskLevel === 'MEDIUM').length,
                lowRisk: usersWithRisk.filter((u) => u.riskLevel === 'LOW').length,
                total: users.length,
            },
            users: usersWithRisk,
        };
    },
    async getClickRateTrend(organizationId, days = 30) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        const participants = await database_1.default.campaignParticipant.findMany({
            where: {
                emailSentAt: { gte: startDate },
                ...(organizationId ? { campaign: { organizationId } } : {}),
            },
            select: { emailSentAt: true, isLinkClicked: true },
        });
        const trendMap = new Map();
        participants.forEach((p) => {
            if (p.emailSentAt) {
                const date = p.emailSentAt.toISOString().split('T')[0];
                if (!trendMap.has(date))
                    trendMap.set(date, { total: 0, clicks: 0 });
                const data = trendMap.get(date);
                data.total++;
                if (p.isLinkClicked)
                    data.clicks++;
            }
        });
        return Array.from(trendMap.entries())
            .map(([date, data]) => ({
            date,
            clickRate: data.total > 0 ? (data.clicks / data.total) * 100 : 0,
        }))
            .sort((a, b) => a.date.localeCompare(b.date));
    },
    async getTemplatePerformance(organizationId) {
        const campaigns = await database_1.default.campaign.findMany({
            where: organizationId ? { organizationId } : {},
            include: {
                template: { select: { name: true } },
                participants: { select: { isLinkClicked: true } },
            },
        });
        const templateMap = new Map();
        campaigns.forEach((campaign) => {
            const templateId = campaign.templateId;
            const templateName = campaign.template?.name || 'Unknown Template';
            if (!templateMap.has(templateId)) {
                templateMap.set(templateId, { name: templateName, clicks: 0, total: 0 });
            }
            const data = templateMap.get(templateId);
            data.total += campaign.participants.length;
            data.clicks += campaign.participants.filter((p) => p.isLinkClicked).length;
        });
        return Array.from(templateMap.values()).map((t) => ({
            name: t.name,
            clickRate: t.total > 0 ? Math.round((t.clicks / t.total) * 100 * 10) / 10 : 0,
            totalSent: t.total,
        }));
    },
};
//# sourceMappingURL=analytics.service.js.map