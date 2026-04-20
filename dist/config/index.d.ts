declare class Config {
    readonly NODE_ENV: string;
    readonly PORT: number;
    readonly API_VERSION: string;
    readonly DATABASE_URL: string;
    readonly JWT_SECRET: string;
    readonly JWT_EXPIRES_IN: string;
    readonly JWT_REFRESH_SECRET: string;
    readonly JWT_REFRESH_EXPIRES_IN: string;
    readonly BCRYPT_ROUNDS: number;
    readonly RATE_LIMIT_WINDOW_MS: number;
    readonly RATE_LIMIT_MAX_REQUESTS: number;
    readonly CORS_ORIGIN: string;
    readonly SMTP_HOST: string;
    readonly SMTP_PORT: number;
    readonly SMTP_SECURE: boolean;
    readonly SMTP_USER: string;
    readonly SMTP_PASSWORD: string;
    readonly FROM_EMAIL: string;
    readonly FROM_NAME: string;
    readonly LOG_LEVEL: string;
    readonly LOG_FILE_PATH: string;
    readonly LOG_ERROR_FILE_PATH: string;
    readonly FRONTEND_URL: string;
    readonly BACKEND_URL: string;
    readonly MAX_FILE_SIZE: number;
    readonly UPLOAD_DIR: string;
    readonly SESSION_SECRET: string;
    readonly SESSION_TIMEOUT: number;
    constructor();
    private getEnvVar;
    private validate;
    get isProduction(): boolean;
    get isDevelopment(): boolean;
    get isTest(): boolean;
}
export declare const config: Config;
export { Config };
//# sourceMappingURL=index.d.ts.map