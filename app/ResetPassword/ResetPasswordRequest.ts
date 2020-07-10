import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { ResetPasswordBodyViewModel } from '@krossr/types';

export interface ResetPasswordRequest extends KrossrRequest<any, ResetPasswordBodyViewModel> {
    params: {
        token: string;
    };
}
