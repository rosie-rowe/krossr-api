import { KrossrErrorBody } from '@krossr/types';
import { Response } from 'express';

export interface KrossrErrorResponse extends Response<KrossrErrorBody> {
}
