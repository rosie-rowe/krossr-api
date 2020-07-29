import { Level } from '../models/LevelModel';

export class LevelListSortByOptions {
    static CreatedDate = `"${nameof<Level>(o => o.createdAt)}"`;
    static Name = nameof<Level>(o => o.name);
    static Ratings = `"${nameof<Level>(o => o.avgRating)}"`;
}
