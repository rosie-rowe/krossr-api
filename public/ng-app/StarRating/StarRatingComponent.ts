import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";

@Component({
    selector: 'star-rating',
    styles: [require('./StarRatingStyles.less')],
    template: require('./StarRatingView.html')
})
export class StarRatingComponent implements OnInit {
    static $name = 'starRating';

    @Input() public max: number = 5;
    @Output() public onRatingSelected: EventEmitter<number> = new EventEmitter();
    @Input() public rating: number;
    @Input() public readOnly;

    private stars: any[];

    private updateStars() {
        this.stars = [];

        for (let i = 0; i < this.max; i++) {
            this.stars.push({
                filled: i < this.rating
            })
        }
    }

    ngOnInit() {
        this.updateStars();
    }

    toggle(index) {
        if (!this.readOnly) {
            this.rating = index + 1;

            this.onRatingSelected.emit(this.rating);

            this.updateStars();
        }
    }
}