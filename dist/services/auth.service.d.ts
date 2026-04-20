export declare const authService: {
    register(data: {
        name: string;
        email: string;
        password: string;
        organizationName?: string;
    }): Promise<{
        user: any;
        tokens: import("../utils/auth").TokenPair;
    }>;
    login(email: string, password: string): Promise<{
        user: {
            id: any;
            name: any;
            email: any;
            role: any;
            organizationId: any;
        };
        tokens: import("../utils/auth").TokenPair;
    }>;
    logout(userId: string, token: string): Promise<void>;
    refreshToken(oldRefreshToken: string): Promise<import("../utils/auth").TokenPair>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map