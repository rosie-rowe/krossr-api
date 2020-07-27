import { ViewModelMapper } from '../ViewModel/ViewModelMapper';
import { User } from '../models/UserModel';
import { UserViewModel } from '@krossr/types';
import { injectable } from 'inversify';

@injectable()
export class UserViewModelMapper implements ViewModelMapper<User, UserViewModel> {
    toViewModel(model: User): UserViewModel {
        return {
            id: model.id,
            username: model.username
        };
    }
}
