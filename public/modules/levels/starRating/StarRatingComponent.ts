export class StarRatingComponent implements angular.IComponentOptions {
    static $name = 'starRating';
    bindToController = true;
    controller = 'StarRatingController';
    controllerAs = 'starRatingCtrl';
    templateUrl = 'modules/levels/starRating/StarRatingView.html';

    bindings = {
        ratingValue: '=ngModel',
        max: '<?',
        onRatingSelected: '&?',
        readOnly: '<?readonly'
    }
}