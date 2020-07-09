import { ForgotPasswordBodyViewModel } from '@krossr/types';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';

export interface ForgotPasswordRequest extends KrossrRequest<any, ForgotPasswordBodyViewModel> {
}
