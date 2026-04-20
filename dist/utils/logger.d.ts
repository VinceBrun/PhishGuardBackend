import winston from 'winston';
declare const logger: winston.Logger;
export declare const stream: {
    write: (message: string) => void;
};
export declare const logRequest: (req: any, res: any, duration: number) => void;
export declare const logError: (error: Error, context?: Record<string, any>) => void;
export declare const logSecurityEvent: (event: string, details: Record<string, any>) => void;
export declare const logDatabaseQuery: (query: string, params?: any[]) => void;
export default logger;
//# sourceMappingURL=logger.d.ts.map