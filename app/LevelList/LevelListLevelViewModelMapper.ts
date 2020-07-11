import { ViewModelMapper } from '../ViewModel/ViewModelMapper';
import { Level } from '../models/LevelModel';
import { LevelListLevelViewModel } from '@krossr/types';
import { injectable, inject } from 'inversify';
import { SizeFormatter } from '../Size/SizeFormatter';

@injectable()
export class LevelListLevelViewModelMapper implements ViewModelMapper<Level, LevelListLevelViewModel> {
    constructor(
        @inject(SizeFormatter) private sizeFormatter: SizeFormatter
    ) {
    }

    toViewModel(model: Level): LevelListLevelViewModel {
        return {
            id: model.id,
            layout: model.layout,
            name: model.name,
            prettySize: this.sizeFormatter.formatSize(model.size),
            size: model.size,
            avgRating: (model as any).dataValues.avgRating, // TODO
            createdAt: model.createdAt.toString(),
            user: model.user
        };
    }

    toModel(viewModel: LevelListLevelViewModel): Level {
        throw new Error('Method not implemented.');
    }
}
