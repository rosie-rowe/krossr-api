import { ViewModelMapper } from '../ViewModel/ViewModelMapper';
import { Level } from '../models/LevelModel';
import { LevelViewModel } from '@krossr/types';
import { injectable } from 'inversify';

@injectable()
export class LevelViewModelMapper implements ViewModelMapper<Level, LevelViewModel> {
    toViewModel(model: Level): LevelViewModel {
        return {
            id: model.id,
            layout: model.layout,
            name: model.name,
            size: model.size
        };
    }

    toModel(viewModel: LevelViewModel): Level {
        throw new Error('Method not implemented.');
    }
}
