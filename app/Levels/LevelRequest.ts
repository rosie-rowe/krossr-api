import { Level } from '../models/LevelModel';
import { KrossrRequest } from '../KrossrRequest/KrossrRequest';

export interface LevelRequest<TReqBody> extends KrossrRequest<any, TReqBody> {
    level: Level;
}
