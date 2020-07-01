import { Request, Response, NextFunction } from 'express';

export class UsersMiddleware {
    /**
     * Requires a login, but not a specific user's login
     */
    public requiresLogin = (req: Request, res: Response, next: NextFunction) => {
        if (!req.isAuthenticated()) {
            return res.status(401).send({
                message: 'User is not logged in'
            });
        }

        next();
    }
}
