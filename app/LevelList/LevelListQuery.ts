export interface LevelListQuery {
    pageNum: number;
    numPerPage: number;
    sizeRestriction: number;
    searchText: string;
    sortBy: string;
    sortDirection: string;
}