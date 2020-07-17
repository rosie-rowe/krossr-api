import { injectable } from 'inversify';
import { Request, Response } from 'express';

@injectable()
export class SignOutController {
    public signOut = (req: Request, res: Response) => {
        req.logout();
        res.status(200).send();
    }
}
