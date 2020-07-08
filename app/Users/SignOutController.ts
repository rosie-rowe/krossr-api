import * as express from 'express';
import { injectable } from 'inversify';

@injectable()
export class SignOutController {
    public signOut = (req, res: express.Response) => {
        req.logout();
        res.status(200).send();
    }
}
