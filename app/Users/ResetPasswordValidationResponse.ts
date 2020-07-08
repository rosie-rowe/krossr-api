import { Response } from 'express';
import { ResetValidationViewModel } from '@krossr/types';
import { KrossrErrorBody } from '@krossr/types';

export interface ResetPasswordValidationResponse extends Response<ResetValidationViewModel | KrossrErrorBody> {
}
