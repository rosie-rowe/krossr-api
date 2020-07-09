import { CreateUserBodyViewModel } from '@krossr/types';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';

export interface SignUpRequest extends KrossrRequest<any, CreateUserBodyViewModel> {
}
