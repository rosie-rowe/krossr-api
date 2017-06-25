/// <reference path="../utils/Utils.d.ts" />

'use strict';

class LevelSelectController implements angular.IComponentController {
    static $controllerAs = 'levelSelectCtrl';
    static $name = 'LevelSelectController';

    static $inject = [
        'Authentication',
        'debounce',
        'Levels',
        'Utils'
    ];

    constructor(
        private Authentication: any,
        private debounce: any,
        private Levels: any,
        private Utils: IUtils
    ) {

    }

    private controller;
    private currentPage: number = 0;
    private showFilter: boolean;
    private selectedLevelId;
    private sizeRestriction: string = '';
    private searchText: string = ''
    private sortBy: string = '';
    private sortDirection: string = '';
    private totalPages: number;
    private level;
    private levels;

    private clearLevel() {
        if (this.level) {
            this.level = null;
        }
    }

    clearAll(action) {
        this.Utils.clearAll();
        this.clearLevel();
    }

    /* Find a list of levels */
    find() {
       var queryObj = {
            pageNum: this.currentPage,
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

    pageDown() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.find();
        }
    }

    pageUp() {
        //currentPage will be off by 1 since it's 0-indexed
        if (this.currentPage + 1 < this.totalPages) {
            this.currentPage++;
            this.find();
        }
    }

    setSearchText(searchText) {
        return this.debounce((searchText: string) => {
            this.searchText = searchText ? searchText : null;
            this.find();
        }, 250);
    }

    setSizeRestriction(sizeRestriction) {
        this.sizeRestriction = sizeRestriction;
        this.find();
    };

    setSortBy(sort_by) {
        this.sortBy = sort_by ? sort_by : null;
        this.find();
    };

    setSortDirection(sort_direction) {
        this.sortDirection = sort_direction ? sort_direction : '';
        this.find();
    };

    toggleShowFilter() {
        this.showFilter = !this.showFilter;
    }
}

angular.module('levels').controller(LevelSelectController.$name, LevelSelectController);