import { ViewModelMapper } from '../ViewModel/ViewModelMapper';
import { Level } from '../models/LevelModel';
import { LevelListLevelViewModel } from '@krossr/types';
import { injectable, inject } from 'inversify';
import { SizeFormatter } from '../Size/SizeFormatter';
import { UserViewModelMapper } from '../Users/UserViewModelMapper';

@injectable()
export class LevelListLevelViewModelMapper implements ViewModelMapper<Level, Promise<LevelListLevelViewModel>> {
    constructor(
        @inject(SizeFormatter) private sizeFormatter: SizeFormatter,
        @inject(UserViewModelMapper) private userMapper: UserViewModelMapper
    ) {
    }

    async toViewModel(model: Level): Promise<LevelListLevelViewModel> {
        let user = await model.getUser();

        return {
            id: model.id,
            layout: model.layout,
            name: model.name,
            prettySize: this.sizeFormatter.formatSize(model.size),
            size: model.size,
            avgRating: (model as any).dataValues.avgRating, // TODO
            createdAt: model.createdAt.toString(),
            user: this.userMapper.toViewModel(user)
        };
    }
}
