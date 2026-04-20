export declare const userService: {
    getAll(filters: {
        search?: string;
        department?: string;
        role?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        users: any;
        total: any;
        page: number;
        limit: number;
    }>;
    getById(id: string): Promise<any>;
    create(data: {
        name: string;
        email: string;
        department?: string;
        role?: string;
        organizationId?: string;
    }): Promise<any>;
    update(id: string, data: {
        name?: string;
        department?: string;
        avatar?: string;
    }): Promise<any>;
    delete(id: string): Promise<void>;
    bulkCreate(users: Array<{
        name: string;
        email: string;
        department?: string;
    }>, organizationId?: string): Promise<any>;
    getPerformance(id: string): Promise<{
        totalCampaigns: any;
        clickRate: number;
        averageQuizScore: number;
        campaigns: any;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map