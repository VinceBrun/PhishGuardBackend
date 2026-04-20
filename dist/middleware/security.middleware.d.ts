import cors from 'cors';
export declare const helmetMiddleware: (req: import("http").IncomingMessage, res: import("http").ServerResponse, next: (err?: unknown) => void) => void;
export declare const corsMiddleware: (req: cors.CorsRequest, res: {
    statusCode?: number | undefined;
    setHeader(key: string, value: string): any;
    end(): any;
}, next: (err?: any) => any) => void;
export declare const rateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const strictRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const apiRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
export declare const uploadRateLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=security.middleware.d.ts.map