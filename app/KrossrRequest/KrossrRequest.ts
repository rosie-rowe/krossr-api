import { Request } from 'express';
import { User } from '../models/UserModel';

export interface KrossrRequest extends Request {
    user?: User;
}
