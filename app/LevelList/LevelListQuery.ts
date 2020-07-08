import { LevelListFilterOptions } from '@krossr/types';

export interface LevelListQuery extends LevelListFilterOptions {
    pageNum: string;
    numPerPage: string;
}
