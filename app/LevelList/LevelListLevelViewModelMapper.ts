import { ViewModelMapper } from '../ViewModel/ViewModelMapper';
import { Level } from '../models/LevelModel';
import { LevelListLevelViewModel } from '@krossr/types';
import { injectable } from 'inversify';

@injectable()
export class LevelListLevelViewModelMapper implements ViewModelMapper<Level, LevelListLevelViewModel> {
    toViewModel(model: Level): LevelListLevelViewModel {
        return {
            id: model.id,
            layout: model.layout,
            name: model.name,
            size: model.size,
            avgRating: (model as any).dataValues.avgRating, // TODO
            createdAt: model.createdAt.toString(),
            user: {
                username: model.user.username
            }
        };
    }

    toModel(viewModel: LevelListLevelViewModel): Level {
        throw new Error('Method not implemented.');
    }
}
