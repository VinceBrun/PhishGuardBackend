export declare class AppError extends Error {
    readonly statusCode: number;
    readonly isOperational: boolean;
    constructor(message: string, statusCode: number, isOperational?: boolean);
}
export declare class BadRequestError extends AppError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string);
}
export declare class ValidationError extends AppError {
    readonly errors: Array<{
        field: string;
        message: string;
    }>;
    constructor(message?: string, errors?: Array<{
        field: string;
        message: string;
    }>);
}
export declare class RateLimitError extends AppError {
    constructor(message?: string);
}
export declare class InternalServerError extends AppError {
    constructor(message?: string);
}
export declare class ServiceUnavailableError extends AppError {
    constructor(message?: string);
}
export declare class DatabaseError extends InternalServerError {
    constructor(message?: string);
}
export declare const isOperationalError: (error: Error) => boolean;
//# sourceMappingURL=errors.d.ts.map