import { AuthenticationService } from '../Authentication/AuthenticationService'
import { Utils } from '../Utils/Utils';
import { LevelService } from '../Level/LevelService';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LevelSelectFilterOptions } from '../LevelSelectFilter/LevelSelectFilterOptions';

@Component({
    selector: 'level-select',
    styles: [require('./LevelSelectStyles.less')],
    template: require('./LevelSelectView.html')
})
export class LevelSelectComponent implements OnInit {
    static $name = 'levelSelect';

    constructor(
        private Authentication: AuthenticationService,
        private levelService: LevelService,
        private matDialogRef: MatDialogRef<LevelSelectComponent>,
        private Utils: Utils
    ) {
    }

    private currentPage: number = 0;
    private showFilter: boolean;
    private filter: LevelSelectFilterOptions;
    private totalPages: number;
    private levels;

    public formGroup: FormGroup;
    
    close() {
        this.matDialogRef.close();
    }

    ngOnInit() {
        this.find(this.currentPage);
        this.formGroup = new FormGroup({});
    }

    /* Find a list of levels */
    find(currentPage: number) {
        this.currentPage = currentPage;

        var queryObj = {
            pageNum: currentPage
        };

        if (this.filter) {
            Object.assign(queryObj, this.filter);
        }
    
        this.levelService.getLevels(queryObj).then(data => {
            var i = 0,
                allLevels = data.levels,
                len = allLevels ? allLevels.length : 0,
                currentLevel;

            this.totalPages = Math.ceil(data.count / data.numPerPage);
            this.levels = data.levels;

            // Calculate the size for each level so we can display it to the screen & sort by size
            for (; i < len; i++ ) {
                currentLevel = allLevels[i];
                currentLevel.prettySize = this.Utils.prettySize(currentLevel.size);
            }
        }); 
    }

    refilter(options: LevelSelectFilterOptions) {
        this.filter = options;
        this.find(0);
    }

    toggleShowFilter() {
        this.showFilter = !this.showFilter;
    }
}