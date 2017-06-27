'use strict';

class HelpComponent implements angular.IComponentOptions {
    static $name = 'help';
    bindToController = true;
    controllerAs = 'helpCtrl';
    templateUrl = 'modules/core/help/HelpView.html';

    bindings = {
        closeAction: '&'
    };
}

angular.module('core').component(HelpComponent.$name, new HelpComponent());