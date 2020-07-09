import { KrossrRequest } from '../KrossrRequest/KrossrRequest';
import { UpsertRatingBodyViewModel } from '@krossr/types';
import { Level } from '../models/LevelModel';

export interface UpsertRatingRequest extends KrossrRequest<any, UpsertRatingBodyViewModel> {
    level: Level;
}
