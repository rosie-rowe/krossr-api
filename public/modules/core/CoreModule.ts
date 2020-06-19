import * as angular from 'angular';

import ConvertToNumberModule from './convertToNumber/ConvertToNumberModule';

export default angular
    .module('core', [
        ConvertToNumberModule
    ])
    .name;