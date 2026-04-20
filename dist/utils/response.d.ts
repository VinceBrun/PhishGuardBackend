import { Response } from 'express';
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    metadata?: {
        page?: number;
        limit?: number;
        total?: number;
        totalPages?: number;
    };
}
export declare const sendSuccess: <T = any>(res: Response, data: T, message?: string, statusCode?: number, metadata?: ApiResponse["metadata"]) => Response;
export declare const sendCreated: <T = any>(res: Response, data: T, message?: string) => Response;
export declare const sendNoContent: (res: Response) => Response;
export declare const sendError: (res: Response, statusCode: number, message: string, code?: string, details?: any) => Response;
export declare const sendPaginated: <T = any>(res: Response, data: T[], page: number, limit: number, total: number, message?: string) => Response;
export declare const responses: {
    ok: (res: Response, data: any, message?: string) => Response<any, Record<string, any>>;
    created: (res: Response, data: any, message?: string) => Response<any, Record<string, any>>;
    noContent: (res: Response) => Response<any, Record<string, any>>;
    badRequest: (res: Response, message?: string, details?: any) => Response<any, Record<string, any>>;
    unauthorized: (res: Response, message?: string) => Response<any, Record<string, any>>;
    forbidden: (res: Response, message?: string) => Response<any, Record<string, any>>;
    notFound: (res: Response, message?: string) => Response<any, Record<string, any>>;
    conflict: (res: Response, message?: string) => Response<any, Record<string, any>>;
    validationError: (res: Response, message?: string, errors?: any) => Response<any, Record<string, any>>;
    tooManyRequests: (res: Response, message?: string) => Response<any, Record<string, any>>;
    serverError: (res: Response, message?: string) => Response<any, Record<string, any>>;
};
//# sourceMappingURL=response.d.ts.map