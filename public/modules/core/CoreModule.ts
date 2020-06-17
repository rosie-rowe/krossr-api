import * as angular from 'angular';

import ConfirmationModule from './confirmation/ConfirmationModule';
import ConvertToNumberModule from './convertToNumber/ConvertToNumberModule';
import HelpModule from './help/HelpModule';
import LoadingAnimationModule from './loadingAnimation/LoadingAnimationModule';
import PopupContentModule from './popupContent/PopupContentModule';
import ResizeModule from './resize/ResizeModule';

import { routing } from './config/RouteModule';

export default angular
    .module('core', [
        ConfirmationModule,
        ConvertToNumberModule,
        HelpModule,
        LoadingAnimationModule,
        PopupContentModule,
        ResizeModule
    ])
    .config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => routing($stateProvider, $urlRouterProvider)])
    .name;