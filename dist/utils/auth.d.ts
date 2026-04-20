export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (password: string, hashedPassword: string) => Promise<boolean>;
export declare const generateAccessToken: (payload: JwtPayload) => string;
export declare const generateRefreshToken: (payload: JwtPayload) => string;
export declare const generateTokenPair: (payload: JwtPayload) => TokenPair;
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => JwtPayload;
export declare const extractTokenFromHeader: (authHeader: string | undefined) => string | null;
export declare const generateRandomToken: () => string;
export declare const validatePasswordStrength: (password: string) => {
    isValid: boolean;
    errors: string[];
};
//# sourceMappingURL=auth.d.ts.map