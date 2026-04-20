export declare const emailService: {
    sendCampaignEmails(campaignId: string): Promise<{
        sentCount: number;
        failedCount: number;
        total: any;
    }>;
    recordOpen(campaignId: string, userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    recordClick(campaignId: string, userId: string, ipAddress?: string, userAgent?: string): Promise<void>;
    verifyConnection(): Promise<boolean>;
};
//# sourceMappingURL=email.service.d.ts.map