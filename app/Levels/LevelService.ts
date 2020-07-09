import btoa from 'btoa';
import { injectable, inject } from 'inversify';
import { Level, LevelCreationAttributes } from '../models/LevelModel';
import { User } from '../models/UserModel';
import { CreateLevelParamsViewModel, LevelViewModel, UpdateLevelParamsViewModel } from '@krossr/types';
import { LevelViewModelMapper } from './LevelViewModelMapper';

@injectable()
export class LevelService {
    constructor(
        @inject(LevelViewModelMapper) private levelMapper: LevelViewModelMapper
    ) {
    }

    async createLevel(user: User, params: CreateLevelParamsViewModel): Promise<LevelViewModel> {
        let attributes: LevelCreationAttributes = {
            name: params.name,
            layout: this.encodeLayout(params.decodedLayout),
            size: params.decodedLayout.length,
            userId: user.id
        };

        let level = await Level.create(attributes);

        return Promise.resolve(this.levelMapper.toViewModel(level));
    }

    async getLevel(user: User, level: Level): Promise<LevelViewModel> {
        let result = this.levelMapper.toViewModel(level);
        result.userRating = this.getUserRating(user, level);
        return Promise.resolve(result);
    }

    async deleteLevel(level: Level) {
        await level.destroy();
    }

    async updateLevel(level: Level, params: UpdateLevelParamsViewModel): Promise<LevelViewModel> {
        let update = {
            name: params.name,
            layout: this.encodeLayout(params.decodedLayout),
            size: params.decodedLayout.length
        };

        let result = await level.update(update);

        return Promise.resolve(this.levelMapper.toViewModel(result));
    }

    private encodeLayout(layout: boolean[][]) {
        let converted = Array.prototype.concat.apply([], layout) // flatten
                             .map((value) => value ? '1' : '0')
                             .join('');

        return btoa(converted);
    }

    private getUserRating(user: User, level: Level) {
        if (level.ratings && user) {
            return level.ratings.find(rating => rating.userId === user.id);
        }
    }
}
