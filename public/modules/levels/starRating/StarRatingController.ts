'use strict';

export default class StarRatingController implements angular.IComponentController {
    static $controllerAs = 'starRatingCtrl';
    static $name = 'StarRatingController';

    static $inject = [
        '$scope'
    ];

    constructor(
        private $scope: angular.IScope
    ) {
        
    }

    private max: number = 5;
    private onRatingSelected: Function;
    private ratingValue: number;
    private readOnly;
    private stars: any[];

    private updateStars() {
        this.stars = [];

        for (let i = 0; i < this.max; i++) {
            this.stars.push({
                filled: i < this.ratingValue
            })
        }
    }

    $onInit() {
        this.updateStars();
    }

    toggle(index) {
        if (!this.readOnly) {
            this.ratingValue = index + 1;

            this.onRatingSelected({
                rating: this.ratingValue
            });

            this.updateStars();
        }
    }
}