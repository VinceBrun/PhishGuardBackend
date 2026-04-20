export declare const templateService: {
    getAll(filters: {
        category?: string;
        difficulty?: string;
        organizationId?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        templates: any;
        total: any;
        page: number;
        limit: number;
    }>;
    getById(id: string): Promise<any>;
    create(data: {
        name: string;
        description: string;
        difficulty: string;
        category: string;
        subject: string;
        fromName: string;
        fromEmail: string;
        body: string;
        ctaText?: string;
        ctaUrl?: string;
        redFlags: string[];
        organizationId?: string;
    }): Promise<any>;
    update(id: string, data: Partial<{
        name: string;
        description: string;
        difficulty: string;
        category: string;
        subject: string;
        fromName: string;
        fromEmail: string;
        body: string;
        ctaText: string;
        ctaUrl: string;
        redFlags: string[];
    }>): Promise<any>;
    delete(id: string): Promise<void>;
    duplicate(id: string, organizationId?: string): Promise<any>;
};
//# sourceMappingURL=template.service.d.ts.map