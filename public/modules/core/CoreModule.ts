'use strict';

import angular from 'angular';

import ComponentDialogModule from './componentDialog/ComponentDialogModule';
import ConfirmationModule from './confirmation/ConfirmationModule';
import ConvertToNumberModule from './convertToNumber/ConvertToNumberModule';
import EventModule from './event/EventModule';
import HeaderModule from './header/HeaderModule';
import HelpModule from './help/HelpModule';
import LoadingAnimationModule from './loadingAnimation/LoadingAnimationModule';
import PaginationModule from'./pagination/PaginationModule';
import ResizeModule from './resize/ResizeModule';
import TouchModule from './touch/TouchModule';

import { routing } from './config/RouteModule';

export default angular
    .module('core', [
        ComponentDialogModule,
        ConfirmationModule,
        ConvertToNumberModule,
        EventModule,
        HeaderModule,
        HelpModule,
        LoadingAnimationModule,
        PaginationModule,
        ResizeModule,
        TouchModule
    ])
    .config(routing);