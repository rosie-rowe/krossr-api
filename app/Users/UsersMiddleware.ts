import { Request, Response, NextFunction } from 'express';
import { ErrorHandler } from '../Error/ErrorHandler';

export class UsersMiddleware {
    constructor(
        private errorHandler: ErrorHandler
    ) {
    }

    /**
     * Requires a login, but not a specific user's login
     */
    public requiresLogin = (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            return this.errorHandler.sendUnauthenticatedErrorResponse(res);
        }

        next();
    }
}
