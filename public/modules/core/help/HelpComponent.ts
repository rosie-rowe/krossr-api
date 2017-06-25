'use strict';

class HelpComponent implements angular.IComponentOptions {
    static $name = 'help';
    templateUrl = 'modules/core/help/HelpView.html';
}

angular.module('core').component(HelpComponent.$name, new HelpComponent());