import { Request } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import { User } from '../models/UserModel';

export interface KrossrRequest<TResBody = any, TReqBody = any, TQuery = Query>
    extends Request<ParamsDictionary, TResBody, TReqBody, TQuery> {
        user?: User;
    }
