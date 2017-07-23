import LoadingAnimationController from './LoadingAnimationController'; 

'use strict';

export default function () {
    return {
        bindings: {
            condition: '<'
        },
        bindToController: true,
        controller: LoadingAnimationController,
        controllerAs: LoadingAnimationController.$controllerAs,
        templateUrl: 'modules/core/loadingAnimation/LoadingAnimationView.html'
    }
}