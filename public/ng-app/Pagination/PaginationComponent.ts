import { Input, Output, EventEmitter, Component } from "@angular/core";

@Component({
    selector: 'pagination',
    styles: [require('./PaginationStyles.less')],
    template: require('./PaginationView.html')
})
export class PaginationComponent {
    static $name = 'pagination';

    @Input() private currentPage: number;
    @Input() private totalPages: number;
    @Output() private onPagination: EventEmitter<number> = new EventEmitter();

    pageDown() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.onPagination.emit(this.currentPage)
        }
    }

    pageUp() {
        if (this.currentPage + 1 < this.totalPages) {
            this.currentPage++;
            this.onPagination.emit(this.currentPage);
        }
    }
}