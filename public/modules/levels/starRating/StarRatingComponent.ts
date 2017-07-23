import StarRatingController from './StarRatingController';

'use strict';

export default function() {
    return {
        bindings: {
            ratingValue: '=ngModel',
            max: '<?',
            onRatingSelected: '&?',
            readOnly: '<?readonly'
        },
        bindToController: true,
        controller: StarRatingController,
        controllerAs: StarRatingController.$controllerAs,
        templateUrl: 'modules/levels/starRating/StarRatingView.html'
    }
}