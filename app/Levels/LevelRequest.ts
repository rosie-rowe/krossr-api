import { Level } from '../models/LevelModel';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';

export interface LevelRequest extends KrossrRequest {
    level: Level;
}
