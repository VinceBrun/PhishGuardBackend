import { Response } from 'express';
export declare const authController: {
    register: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    login: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    logout: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    refreshToken: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    me: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
    changePassword: (req: import("express").Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=auth.controller.d.ts.map