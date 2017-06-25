/// <reference path="../utils/Utils.d.ts" />
/// <reference path="../../users/authentication/AuthenticationService.d.ts" />

'use strict';

class LevelSelectController implements angular.IComponentController {
    static $controllerAs = 'levelSelectCtrl';
    static $name = 'LevelSelectController';

    static $inject = [
        'Authentication',
        'Levels',
        'Utils'
    ];

    constructor(
        private Authentication: IAuthenticationService,
        private Levels: any,
        private Utils: IUtils
    ) {

    }

    private currentPage: number = 0;
    private showFilter: boolean;
    private selectedLevelId;
    private sizeRestriction: string = '';
    private searchText: string = ''
    private sortBy: string = '"createdAt"';
    private sortDirection: string = '';
    private totalPages: number;
    private levels;

    /* Find a list of levels */
    find(currentPage: number) {
        this.currentPage = currentPage;

        var queryObj = {
            pageNum: currentPage,
            sizeRestriction: this.sizeRestriction,
            searchText: this.searchText,
            sortBy: this.sortBy,
            sortDirection: this.sortDirection
        };
    
        this.Levels.query(queryObj, (data) => {
            var i = 0,
                allLevels = data.levels,
                len = allLevels ? allLevels.length : 0,
                currentLevel;

            this.totalPages = Math.ceil(data.count / data.numPerPage);
            this.levels = data.levels;

            // Calculate the size for each level so we can display it to the screen & sort by size
            for (; i < len; i++ ) {
                currentLevel = allLevels[i];
                currentLevel.prettySize = this.Utils.prettySize(currentLevel.layout.length);
            }
        }); 
    }

    toggleShowFilter() {
        this.showFilter = !this.showFilter;
    }
}

angular.module('levels').controller(LevelSelectController.$name, LevelSelectController);