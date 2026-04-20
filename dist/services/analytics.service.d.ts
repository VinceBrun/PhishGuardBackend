export declare const analyticsService: {
    getOverview(organizationId?: string): Promise<{
        totalUsers: any;
        totalCampaigns: any;
        activeCampaigns: any;
        overallClickRate: number;
        averageQuizScore: number;
        totalEmailsSent: any;
    }>;
    getDepartmentStats(organizationId?: string): Promise<{
        name: string;
        userCount: number;
        clickRate: number;
        averageQuizScore: number;
    }[]>;
    getRiskAssessment(organizationId?: string): Promise<{
        summary: {
            highRisk: any;
            mediumRisk: any;
            lowRisk: any;
            total: any;
        };
        users: any;
    }>;
    getClickRateTrend(organizationId?: string, days?: number): Promise<{
        date: string;
        clickRate: number;
    }[]>;
    getTemplatePerformance(organizationId?: string): Promise<{
        name: string;
        clickRate: number;
        totalSent: number;
    }[]>;
};
//# sourceMappingURL=analytics.service.d.ts.map