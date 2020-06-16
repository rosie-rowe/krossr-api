import * as angular from 'angular';

import ComponentDialogModule from './componentDialog/ComponentDialogModule';
import ConfirmationModule from './confirmation/ConfirmationModule';
import ConvertToNumberModule from './convertToNumber/ConvertToNumberModule';
import HeaderModule from './header/HeaderModule';
import HelpModule from './help/HelpModule';
import LoadingAnimationModule from './loadingAnimation/LoadingAnimationModule';
import PaginationModule from'./pagination/PaginationModule';
import PopupContentModule from './popupContent/PopupContentModule';
import ResizeModule from './resize/ResizeModule';

import { routing } from './config/RouteModule';

export default angular
    .module('core', [
        ComponentDialogModule,
        ConfirmationModule,
        ConvertToNumberModule,
        HeaderModule,
        HelpModule,
        LoadingAnimationModule,
        PaginationModule,
        PopupContentModule,
        ResizeModule
    ])
    .config(routing)
    .name;