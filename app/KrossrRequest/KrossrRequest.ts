import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { User } from '../models/UserModel';

export interface KrossrRequest<TResBody = any, TReqBody = any> extends Request<ParamsDictionary, TResBody, TReqBody> {
    user?: User;
}
