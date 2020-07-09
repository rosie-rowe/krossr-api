import { injectable } from 'inversify';
import { Level } from '../models/LevelModel';

@injectable()
export class LevelService {
    async deleteLevel(level: Level) {
        await level.destroy();
    }
}
