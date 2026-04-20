import { Request, Response } from 'express';
export declare const emailController: {
    trackOpen: (req: Request, res: Response) => Promise<void>;
    trackClick: (req: Request, res: Response) => Promise<void>;
    verifySmtp: (req: Request, res: Response, next: import("express").NextFunction) => void;
};
//# sourceMappingURL=email.controller.d.ts.map