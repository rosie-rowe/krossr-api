import { Component, Input, EventEmitter, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { LevelSelectFilterOptions } from "./LevelSelectFilterOptions";

@Component({
    selector: 'level-select-filter',
    template: require('./LevelSelectFilterView.html')
})
export class LevelSelectFilterComponent implements OnInit {
    @Output() public refilter: EventEmitter<LevelSelectFilterOptions> = new EventEmitter();

    public formGroup: FormGroup;
    public sizeFormControl: FormControl;
    public searchTextFormControl: FormControl;
    public sortByFormControl: FormControl;
    public sortDirectionFormControl: FormControl;

    // todo these options should be provided by the server

    public sizeMap = {
        'All': '',
        '5x5': '5',
        '10x10': '10',
        '15x15': '15'
    };

    public sizeOptions = Object.keys(this.sizeMap);

    public sortByMap = {
        'Created Date': '"createdAt"',
        'Name': 'name',
        'Ratings': '"avgRating"'
    };

    public sortByOptions = Object.keys(this.sortByMap);

    public sortDirectionMap = {
        'Ascending': '',
        'Descending': 'DESC'
    };

    public sortDirectionOptions = Object.keys(this.sortDirectionMap);

    private options: LevelSelectFilterOptions = {}

    public ngOnInit() {
        this.formGroup = new FormGroup({});
        this.sizeFormControl = new FormControl(this.sizeOptions[0]);
        this.searchTextFormControl = new FormControl('');
        this.sortByFormControl = new FormControl(this.sortByOptions[0]);
        this.sortDirectionFormControl = new FormControl(this.sortDirectionOptions[0]);

        this.formGroup.addControl('size', this.sizeFormControl);
        this.formGroup.addControl('searchText', this.searchTextFormControl);
        this.formGroup.addControl('sortBy', this.sortByFormControl);
        this.formGroup.addControl('sortDirection', this.sortDirectionFormControl);
    }

    public onChange() {
        this.refilter.emit(this.options);
    }

    public updateSize(size: string) {
        this.sizeFormControl.setValue(size);
        this.options.sizeRestriction = this.sizeMap[size];
        this.onChange();
    }
    
    // todo debounce
    public updateSearchText(text: string) {
        this.searchTextFormControl.setValue(text);
        this.options.searchText = text;
        this.onChange();
    }

    public updateSortBy(sortBy: string) {
        this.sortByFormControl.setValue(sortBy);
        this.options.sortBy = this.sortByMap[sortBy];
        this.onChange();
    }

    public updateSortDirection(sortDirection: string) {
        this.sortDirectionFormControl.setValue(sortDirection);
        this.options.sortDirection = this.sortDirectionMap[sortDirection];
        this.onChange();
    }
}