import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { User } from '../models/UserModel';

export interface UserRequest extends KrossrRequest {
    user: User;
}
