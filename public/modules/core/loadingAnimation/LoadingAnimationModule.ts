import angular from 'angular';
import LoadingAnimationComponent from './LoadingAnimationComponent';
import LoadingAnimationController from './LoadingAnimationController';

export default angular
    .module('core.loadingAnimation')
    .component(LoadingAnimationComponent.$name, new LoadingAnimationComponent())
    .controller(LoadingAnimationController.$name, LoadingAnimationController)
    .name;