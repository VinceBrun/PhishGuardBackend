export declare const campaignService: {
    getAll(filters: {
        status?: string;
        search?: string;
        organizationId?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        campaigns: any[];
        total: any;
        page: number;
        limit: number;
    }>;
    getById(id: string): Promise<any>;
    create(data: {
        name: string;
        description?: string;
        templateId: string;
        recipientIds: string[];
        scheduledAt?: Date;
        organizationId: string;
    }): Promise<any>;
    update(id: string, data: {
        name?: string;
        description?: string;
        status?: "DRAFT" | "SCHEDULED" | "ACTIVE" | "COMPLETED";
    }): Promise<any>;
    delete(id: string): Promise<void>;
    launch(id: string): Promise<any>;
    getResults(id: string): Promise<any>;
};
//# sourceMappingURL=campaign.service.d.ts.map