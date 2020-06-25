import * as express from 'express';

export class SignOutController {
    public signOut = (req, res: express.Response) => {
        req.logout();
        res.status(200).send();
    }
}