webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileState;
(function (TileState) {
    TileState[TileState["empty"] = 0] = "empty";
    TileState[TileState["pending"] = 1] = "pending";
    TileState[TileState["marked"] = 2] = "marked";
    TileState[TileState["selected"] = 3] = "selected"; // colored in, for marking that the tile is correct
})(TileState = exports.TileState || (exports.TileState = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __webpack_require__(70);
/**
* The matrix implementation we'll use for the game functionality
*/
var BooleanMatrix = /** @class */ (function (_super) {
    __extends(BooleanMatrix, _super);
    function BooleanMatrix(rowCount, colCount) {
        var _this = _super.call(this, rowCount, colCount) || this;
        // Initialize to false
        _this.clear();
        return _this;
    }
    BooleanMatrix.prototype.clear = function () {
        var _this = this;
        this.iterate(function (row, column) {
            _this.setValueAt(row, column, false);
        });
    };
    return BooleanMatrix;
}(Matrix_1.Matrix));
exports.BooleanMatrix = BooleanMatrix;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var config_1 = __webpack_require__(23);
var CoreModule_1 = __webpack_require__(24);
var LevelsModule_1 = __webpack_require__(53);
var UsersModule_1 = __webpack_require__(104);
function application() {
    var dependencies = config_1.ApplicationConfiguration.applicationModuleVendorDependencies.concat([
        CoreModule_1.default,
        LevelsModule_1.default,
        UsersModule_1.default
    ]);
    angular.module(config_1.ApplicationConfiguration.applicationModuleName, dependencies);
    // Setting HTML5 Location Mode
    angular.module(config_1.ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
        function ($locationProvider) {
            $locationProvider.hashPrefix('!');
        }
    ]);
    // Setting ngDialog defaults
    angular.module(config_1.ApplicationConfiguration.applicationModuleName).config(['ngDialogProvider',
        function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                closeByDocument: false,
                overlay: true,
                appendTo: '#main-section'
            });
        }
    ]);
    //Then define the init function for starting up the application
    angular.element(document).ready(function () {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_')
            window.location.hash = '#!';
        // If it's not already defined, define a method to find the index of an object in an array.
        if (!Array.prototype.hasOwnProperty('indexOfObject')) {
            Array.prototype['indexOfObject'] = function (obj) {
                for (var i = 0; i < this.length; i++) {
                    if (angular.equals(this[i], obj)) {
                        return i;
                    }
                }
                ;
                return -1;
            };
        }
        //Then init the app
        angular.bootstrap(document, [config_1.ApplicationConfiguration.applicationModuleName]);
    });
}
application();


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Init the application configuration module for AngularJS application
exports.ApplicationConfiguration = (function () {
    // Init module configuration options
    var applicationModuleName = 'Krossr';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ngCookies',
        'ngDialog',
        'ngLodash',
        'ngTouch',
        'ngSanitize',
        'ui.router',
        'ui.utils',
        'debounce',
        'templates-main'
    ];
    return {
        applicationModuleName: applicationModuleName,
        applicationModuleVendorDependencies: applicationModuleVendorDependencies
    };
})();


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ComponentDialogModule_1 = __webpack_require__(25);
var ConfirmationModule_1 = __webpack_require__(28);
var ConvertToNumberModule_1 = __webpack_require__(31);
var EventServiceModule_1 = __webpack_require__(33);
var HeaderModule_1 = __webpack_require__(35);
var HelpModule_1 = __webpack_require__(38);
var LoadingAnimationModule_1 = __webpack_require__(40);
var PaginationModule_1 = __webpack_require__(43);
var PopupContentModule_1 = __webpack_require__(46);
var ResizeModule_1 = __webpack_require__(48);
var TouchModule_1 = __webpack_require__(50);
var RouteModule_1 = __webpack_require__(52);
exports.default = angular
    .module('core', [
    ComponentDialogModule_1.default,
    ConfirmationModule_1.default,
    ConvertToNumberModule_1.default,
    EventServiceModule_1.default,
    HeaderModule_1.default,
    HelpModule_1.default,
    LoadingAnimationModule_1.default,
    PaginationModule_1.default,
    PopupContentModule_1.default,
    ResizeModule_1.default,
    TouchModule_1.default
])
    .config(RouteModule_1.routing)
    .name;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ComponentDialogController_1 = __webpack_require__(26);
var ComponentDialogService_1 = __webpack_require__(27);
exports.default = angular
    .module('core.componentDialog', [])
    .controller(ComponentDialogController_1.ComponentDialogController.$name, ComponentDialogController_1.ComponentDialogController)
    .service(ComponentDialogService_1.ComponentDialogService.$name, ComponentDialogService_1.ComponentDialogService)
    .name;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** A controller for an individual ComponentDialog, meant to provide the closeThisDialog() function & others to all of them without needing to explicity pass it in */
var ComponentDialogController = /** @class */ (function () {
    function ComponentDialogController() {
    }
    ComponentDialogController.prototype.$onInit = function () {
        // TSBUG
    };
    ComponentDialogController.$controllerAs = 'componentDialogCtrl';
    ComponentDialogController.$name = 'ComponentDialogController';
    return ComponentDialogController;
}());
exports.ComponentDialogController = ComponentDialogController;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
'use strict';
/**
 * Wrapper for ngDialog to easily allow dialogs to be defined as components
 */
var ComponentDialogService = /** @class */ (function () {
    function ComponentDialogService(lodash, ngDialog) {
        this.lodash = lodash;
        this.ngDialog = ngDialog;
        this.defaultOptions = {
            plain: true
        };
    }
    /**
     * Converts a 1-level deep object consisting of attributes to give to a component dialog, e.g.
     * { thisIsAnAttribute: 'thisIsAValue' } => `this-is-an-attribute="thisIsAValue"`
     * @param obj
     */
    ComponentDialogService.prototype.convertObjectToAttributes = function (obj) {
        var result = '';
        if (!obj) {
            return result;
        }
        var keys = Object.keys(obj);
        for (var i = 0, len = keys.length; i < len; i++) {
            var currentKey = keys[i];
            result += this.lodash.kebabCase(currentKey) + "=\"" + obj[currentKey] + "\" ";
        }
        return result;
    };
    ComponentDialogService.prototype.getDefaultOpenOptions = function (directiveName, data) {
        return angular.extend(this.defaultOptions, {
            controller: 'ComponentDialogController',
            controllerAs: 'componentDialogCtrl',
            template: this.getTemplate(directiveName, data)
        });
    };
    ComponentDialogService.prototype.getDefaultOpenConfirmOptions = function (directiveName, data) {
        return angular.extend(this.defaultOptions, {
            template: this.getTemplate(directiveName, data)
        });
    };
    ComponentDialogService.prototype.getTemplate = function (directiveName, data) {
        return '<' + directiveName + ' close-action="closeThisDialog()"' + this.convertObjectToAttributes(data) + '>' + '</' + directiveName + '>';
    };
    ComponentDialogService.prototype.open = function (directiveName, data) {
        var options = this.getDefaultOpenOptions(directiveName, data);
        return this.ngDialog.open(options);
    };
    ComponentDialogService.prototype.openConfirm = function (directiveName, data) {
        var options = this.getDefaultOpenConfirmOptions(directiveName);
        return this.ngDialog.openConfirm(options);
    };
    ComponentDialogService.$name = 'componentDialogService';
    ComponentDialogService.$inject = [
        'lodash',
        'ngDialog'
    ];
    return ComponentDialogService;
}());
exports.ComponentDialogService = ComponentDialogService;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ConfirmationComponent_1 = __webpack_require__(29);
var ConfirmationController_1 = __webpack_require__(30);
exports.default = angular
    .module('core.confirmation', [])
    .component(ConfirmationComponent_1.ConfirmationComponent.$name, new ConfirmationComponent_1.ConfirmationComponent())
    .controller(ConfirmationController_1.ConfirmationController.$name, ConfirmationController_1.ConfirmationController)
    .name;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmationComponent = /** @class */ (function () {
    function ConfirmationComponent() {
        this.bindToController = true;
        this.controller = 'ConfirmationController';
        this.controllerAs = 'confirmationCtrl';
        this.templateUrl = 'modules/core/confirmation/ConfirmationView.html';
        this.bindings = {
            cancelAction: '&',
            confirmAction: '&',
            submitAction: '&',
            submitText: '@'
        };
    }
    ConfirmationComponent.$name = 'confirmation';
    return ConfirmationComponent;
}());
exports.ConfirmationComponent = ConfirmationComponent;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ConfirmationController = /** @class */ (function () {
    function ConfirmationController(ngDialog) {
        this.ngDialog = ngDialog;
    }
    ConfirmationController.prototype.$onInit = function () {
    };
    ConfirmationController.$controllerAs = 'confirmationCtrl';
    ConfirmationController.$name = 'ConfirmationController';
    ConfirmationController.$inject = [
        'ngDialog'
    ];
    return ConfirmationController;
}());
exports.ConfirmationController = ConfirmationController;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ConvertToNumberDirective_1 = __webpack_require__(32);
exports.default = angular
    .module('core.convertToNumber', [])
    .directive('convertToNumber', function () { return new ConvertToNumberDirective_1.ConvertToNumberDirective(); })
    .name;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Required to have a number select a dropdown's value, stolen from https://docs.angularjs.org/api/ng/directive/select */
var ConvertToNumberDirective = /** @class */ (function () {
    function ConvertToNumberDirective() {
        this.require = 'ngModel';
        this.restrict = 'A';
        this.link = function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function (val) {
                return '' + val;
            });
        };
    }
    ConvertToNumberDirective.$name = 'convertToNumber';
    return ConvertToNumberDirective;
}());
exports.ConvertToNumberDirective = ConvertToNumberDirective;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var EventService_1 = __webpack_require__(34);
exports.default = angular
    .module('core.eventService', [])
    .service(EventService_1.EventService.$name, EventService_1.EventService)
    .name;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Handles broadcast/on events */
var EventService = /** @class */ (function () {
    function EventService($rootScope) {
        this.$rootScope = $rootScope;
    }
    /** Using this method ensures that an event will always be broadcast from the root down instead of having to worry about hierarchy. */
    EventService.prototype.publish = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.$rootScope.$broadcast(event, args);
    };
    /** Using this method ensures that an event will always be destroyed when the accompanying scope is destroyed, saving boilerplate code */
    EventService.prototype.subscribe = function (scope, event, action) {
        var eventCanceler = scope.$on(event, function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            action(event, args);
        });
        scope.$on('destroy', eventCanceler);
    };
    EventService.$name = 'eventService';
    EventService.$inject = [
        '$rootScope'
    ];
    return EventService;
}());
exports.EventService = EventService;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var HeaderComponent_1 = __webpack_require__(36);
var HeaderController_1 = __webpack_require__(37);
exports.default = angular
    .module('core.header', [])
    .component(HeaderComponent_1.HeaderComponent.$name, new HeaderComponent_1.HeaderComponent())
    .controller(HeaderController_1.HeaderController.$name, HeaderController_1.HeaderController)
    .name;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.controller = 'HeaderController';
        this.controllerAs = 'headerCtrl';
        this.templateUrl = 'modules/core/header/HeaderView.html';
    }
    HeaderComponent.$name = 'krossrHeader';
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HeaderController = /** @class */ (function () {
    function HeaderController(Authentication, componentDialogService) {
        this.Authentication = Authentication;
        this.componentDialogService = componentDialogService;
    }
    HeaderController.prototype.$onInit = function () { };
    HeaderController.prototype.openEditProfile = function () {
        this.componentDialogService.open('edit-profile');
    };
    HeaderController.prototype.openHelp = function () {
        this.componentDialogService.open('help');
    };
    HeaderController.prototype.openLevelSelect = function () {
        this.componentDialogService.open('level-select');
    };
    HeaderController.prototype.openSignIn = function () {
        this.componentDialogService.open('sign-in');
    };
    HeaderController.prototype.openSignUp = function () {
        this.componentDialogService.open('sign-up');
    };
    HeaderController.$controllerAs = 'headerCtrl';
    HeaderController.$name = 'HeaderController';
    HeaderController.$inject = [
        'Authentication',
        'componentDialogService',
    ];
    return HeaderController;
}());
exports.HeaderController = HeaderController;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var HelpComponent_1 = __webpack_require__(39);
exports.default = angular
    .module('core.help', [])
    .component(HelpComponent_1.HelpComponent.$name, new HelpComponent_1.HelpComponent())
    .name;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HelpComponent = /** @class */ (function () {
    function HelpComponent() {
        this.bindToController = true;
        this.controllerAs = 'helpCtrl';
        this.templateUrl = 'modules/core/help/HelpView.html';
        this.bindings = {
            closeAction: '&'
        };
    }
    HelpComponent.$name = 'help';
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var LoadingAnimationComponent_1 = __webpack_require__(41);
var LoadingAnimationController_1 = __webpack_require__(42);
exports.default = angular
    .module('core.loadingAnimation', [])
    .component(LoadingAnimationComponent_1.LoadingAnimationComponent.$name, new LoadingAnimationComponent_1.LoadingAnimationComponent())
    .controller(LoadingAnimationController_1.LoadingAnimationController.$name, LoadingAnimationController_1.LoadingAnimationController)
    .name;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoadingAnimationComponent = /** @class */ (function () {
    function LoadingAnimationComponent() {
        this.bindToController = true;
        this.controller = 'LoadingAnimationController';
        this.controllerAs = 'loadingAnimationCtrl';
        this.templateUrl = 'modules/core/loadingAnimation/LoadingAnimationView.html';
        this.bindings = {
            condition: '<'
        };
    }
    LoadingAnimationComponent.$name = 'loadingAnimation';
    return LoadingAnimationComponent;
}());
exports.LoadingAnimationComponent = LoadingAnimationComponent;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LoadingAnimationController = /** @class */ (function () {
    function LoadingAnimationController() {
    }
    LoadingAnimationController.prototype.$onInit = function () { };
    LoadingAnimationController.controllerAs = 'loadingAnimationCtrl';
    LoadingAnimationController.$name = 'LoadingAnimationController';
    return LoadingAnimationController;
}());
exports.LoadingAnimationController = LoadingAnimationController;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var PaginationComponent_1 = __webpack_require__(44);
var PaginationController_1 = __webpack_require__(45);
exports.default = angular
    .module('core.pagination', [])
    .component(PaginationComponent_1.PaginationComponent.$name, new PaginationComponent_1.PaginationComponent())
    .controller(PaginationController_1.PaginationController.$name, PaginationController_1.PaginationController)
    .name;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.bindToController = true;
        this.controller = 'PaginationController';
        this.controllerAs = 'paginationCtrl';
        this.templateUrl = 'modules/core/pagination/PaginationView.html';
        this.bindings = {
            onPagination: '&',
            currentPage: '=',
            totalPages: '<'
        };
    }
    PaginationComponent.$name = 'pagination';
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PaginationController = /** @class */ (function () {
    function PaginationController() {
    }
    PaginationController.prototype.$onInit = function () { };
    PaginationController.prototype.pageDown = function () {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.onPagination({
                currentPage: this.currentPage
            });
        }
    };
    PaginationController.prototype.pageUp = function () {
        if (this.currentPage + 1 < this.totalPages) {
            this.currentPage++;
            this.onPagination({
                currentPage: this.currentPage
            });
        }
    };
    PaginationController.$controllerAs = 'paginationCtrl';
    PaginationController.$name = 'PaginationController';
    PaginationController.$inject = [];
    return PaginationController;
}());
exports.PaginationController = PaginationController;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var PopupContentComponent_1 = __webpack_require__(47);
exports.default = angular
    .module('core.popupContent', [])
    .component(PopupContentComponent_1.PopupContentComponent.$name, new PopupContentComponent_1.PopupContentComponent())
    .name;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PopupContentComponent = /** @class */ (function () {
    function PopupContentComponent() {
        this.bindToController = true;
        this.templateUrl = 'modules/core/popupContent/PopupContentView.html';
        this.transclude = true;
    }
    PopupContentComponent.$name = 'popupContent';
    return PopupContentComponent;
}());
exports.PopupContentComponent = PopupContentComponent;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ResizeDirective_1 = __webpack_require__(49);
exports.default = angular
    .module('core.resize', [])
    .directive(ResizeDirective_1.ResizeDirective.$name, function ($window, debounce, gameSizeService, Utils) { return new ResizeDirective_1.ResizeDirective($window, debounce, gameSizeService, Utils); })
    .name;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
'use strict';
var ResizeDirective = /** @class */ (function () {
    function ResizeDirective($window, debounce, gameSizeService, Utils) {
        var _this = this;
        this.$window = $window;
        this.debounce = debounce;
        this.gameSizeService = gameSizeService;
        this.Utils = Utils;
        this.link = function (scope) {
            var gameMatrix;
            angular.element(_this.$window).on('resize', _this.debounce(function () {
                gameMatrix = _this.Utils.getGameMatrix();
                if (gameMatrix) {
                    _this.gameSizeService.calculatePlayableArea();
                    _this.gameSizeService.setGameSize(gameMatrix.length);
                    scope.$apply();
                }
            }, 250));
        };
    }
    ResizeDirective.$name = 'resize';
    ResizeDirective.$inject = [
        '$window',
        'debounce',
        'gameSizeService',
        'Utils'
    ];
    return ResizeDirective;
}());
exports.ResizeDirective = ResizeDirective;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var TouchService_1 = __webpack_require__(51);
exports.default = angular
    .module('core.touch', [])
    .service(TouchService_1.TouchService.$name, TouchService_1.TouchService)
    .name;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
'use strict';
var TouchService = /** @class */ (function () {
    function TouchService() {
    }
    /** Touchmove/touchend will not move along with crossing over elements like mousemove/mouseup will, so we need hax */
    TouchService.prototype.getRealTarget = function (event) {
        var myLocation = this.getTouches(event)[0];
        return angular.element(document.elementFromPoint(myLocation.clientX, myLocation.clientY));
    };
    /** Shortcut for getting actual target scope */
    TouchService.prototype.getTargetScope = function (event) {
        var target = this.getRealTarget(event);
        return target.scope();
    };
    /**
     * Stolen from http://www.jqwidgets.com/community/topic/dragend-event-properties-clientx-and-clienty-are-undefined-on-ios/
     * Handles both mouse and touch events. Modified for brevity */
    TouchService.prototype.getTouches = function (event) {
        if (event.originalEvent) {
            if (event.originalEvent.touches && event.originalEvent.touches.length) {
                return event.originalEvent.touches;
            }
            else if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length) {
                return event.originalEvent.changedTouches;
            }
        }
        if (!event.touches) {
            event.touches = [event.originalEvent];
        }
        return event.touches;
    };
    TouchService.$name = 'touchService';
    return TouchService;
}());
exports.TouchService = TouchService;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function routing($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.
        state('home', {
        url: '/',
        templateUrl: 'modules/core/views/index.client.view.html'
    });
}
exports.routing = routing;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var DragBoxModule_1 = __webpack_require__(54);
var GameModule_1 = __webpack_require__(56);
var GameOverModule_1 = __webpack_require__(59);
var GameSizeModule_1 = __webpack_require__(63);
var LevelModule_1 = __webpack_require__(65);
var LevelSelectModule_1 = __webpack_require__(72);
var ModeSelectorModule_1 = __webpack_require__(75);
var NumberGridModule_1 = __webpack_require__(78);
var NumberLineModule_1 = __webpack_require__(81);
var ShellModule_1 = __webpack_require__(85);
var ShiftServiceModule_1 = __webpack_require__(88);
var StarRatingModule_1 = __webpack_require__(90);
var SideLengthServiceModule_1 = __webpack_require__(93);
var TileModule_1 = __webpack_require__(95);
var TileSizeModule_1 = __webpack_require__(99);
var UtilsModule_1 = __webpack_require__(101);
var RouteModule_1 = __webpack_require__(103);
exports.default = angular
    .module('levels', [
    DragBoxModule_1.default,
    GameModule_1.default,
    GameOverModule_1.default,
    GameSizeModule_1.default,
    LevelModule_1.default,
    LevelSelectModule_1.default,
    ModeSelectorModule_1.default,
    NumberGridModule_1.default,
    NumberLineModule_1.default,
    ShellModule_1.default,
    ShiftServiceModule_1.default,
    StarRatingModule_1.default,
    SideLengthServiceModule_1.default,
    TileModule_1.default,
    TileSizeModule_1.default,
    UtilsModule_1.default
])
    .config(RouteModule_1.LevelsRoutes.route)
    .name;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var DragBoxService_1 = __webpack_require__(55);
exports.default = angular
    .module('levels.dragBox', [])
    .service(DragBoxService_1.DragBoxService.$name, DragBoxService_1.DragBoxService)
    .name;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DragBoxService = /** @class */ (function () {
    function DragBoxService(tileService) {
        this.tileService = tileService;
        this._initState = true;
    }
    Object.defineProperty(DragBoxService.prototype, "initState", {
        get: function () {
            return this._initState;
        },
        set: function (state) {
            this._initState = state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragBoxService.prototype, "startCoord", {
        get: function () {
            return this._startCoord;
        },
        set: function (coord) {
            this._startCoord = coord;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DragBoxService.prototype, "endCoord", {
        get: function () {
            return this._endCoord;
        },
        set: function (coord) {
            this._endCoord = coord;
        },
        enumerable: true,
        configurable: true
    });
    DragBoxService.prototype.clearDragBox = function () {
        this.startCoord = undefined;
        this.endCoord = undefined;
        this.initState = true;
    };
    /**
     * Change the tiles in the dragbox to the correct state
     */
    DragBoxService.prototype.fill = function (override) {
        if (this.validate()) {
            this.tileService.fillTiles(this.process(), this.initState, override);
            this.clearDragBox();
        }
    };
    /*
    * Given a dragbox, return an array of all of the coordinates of included tiles
    */
    DragBoxService.prototype.process = function () {
        var _a, _b;
        if (!this.validate()) {
            return [];
        }
        var startX = this.startCoord.x;
        var startY = this.startCoord.y;
        var endX = this.endCoord.x;
        var endY = this.endCoord.y;
        var finalCoords = [];
        if (startX > endX) {
            _a = [startX, endX], endX = _a[0], startX = _a[1];
        }
        if (startY > endY) {
            _b = [startY, endY], endY = _b[0], startY = _b[1];
        }
        for (var i = startY; i <= endY; i++) {
            for (var j = startX; j <= endX; j++) {
                var coord = {
                    x: j,
                    y: i
                };
                finalCoords.push(coord);
            }
        }
        return finalCoords;
    };
    DragBoxService.prototype.validateStart = function () {
        return this.startCoord;
    };
    DragBoxService.prototype.validate = function () {
        return this.startCoord && this.endCoord;
    };
    DragBoxService.$name = 'dragBoxService';
    DragBoxService.$inject = [
        'tileService'
    ];
    return DragBoxService;
}());
exports.DragBoxService = DragBoxService;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var GameComponent_1 = __webpack_require__(57);
var GameController_1 = __webpack_require__(58);
exports.default = angular
    .module('levels.game', [])
    .component(GameComponent_1.GameComponent.$name, new GameComponent_1.GameComponent())
    .controller(GameController_1.GameController.$name, GameController_1.GameController)
    .name;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameComponent = /** @class */ (function () {
    function GameComponent() {
        this.bindToController = true;
        this.controller = 'GameController';
        this.controllerAs = 'gameCtrl';
        this.templateUrl = 'modules/levels/game/GameView.html';
        this.bindings = {
            gameMatrix: '<',
            goalMatrix: '<',
            level: '<',
            tiles: '<'
        };
    }
    GameComponent.$name = 'game';
    return GameComponent;
}());
exports.GameComponent = GameComponent;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileState_1 = __webpack_require__(1);
'use strict';
var GameController = /** @class */ (function () {
    function GameController($element, $scope, eventService, gameOverService, gameSizeService, tileSizeService, dragBoxService) {
        this.$element = $element;
        this.$scope = $scope;
        this.eventService = eventService;
        this.gameOverService = gameOverService;
        this.gameSizeService = gameSizeService;
        this.tileSizeService = tileSizeService;
        this.dragBoxService = dragBoxService;
    }
    GameController.prototype.$onInit = function () {
        this.dragBoxService.clearDragBox();
    };
    GameController.prototype.$postLink = function () {
        var _this = this;
        this.setMargin(this.tileSizeService.getTileSize());
        /* not sure if this is still necessary, seems to prevent grab hand from appearing even though draggable is no longer applied */
        this.$element.on('dragstart', function (e) { return e.preventDefault(); });
        // focus the game when the mouse enters it so that the first click will register
        this.$element.on('mouseenter', function () {
            _this.$element.find('.inner').focus();
        });
        // If the user goes too far away from the game area, clear the dragbox and empty the tiles.
        this.$element.on('mouseleave', function (e) {
            e.preventDefault();
            _this.applyFillDragBox(TileState_1.TileState.empty);
        });
        /**
         * If a user starts dragging a tile and their mouse pointer leaves the game area,
         * the area that was highlighted before should stay highlighted,
         * and should activate when the user lets go of the mouse button.
         * When the mouse is released in the game, attempt to process a dragbox and check if the game is won.
         * This event works with the mouseup event in TileController and
         * should always run after that event due to bubbling.
         */
        this.$element.on('mouseup', function (e) { return _this.mouseUpEvent(e); });
        this.$element.on('touchend', function (e) {
            e.preventDefault();
            _this.mouseUpEvent(e);
        });
        this.eventService.subscribe(this.$scope, 'gameSizeChanged', function () {
            _this.updateGameSize();
        });
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', function (e, args) {
            _this.setMargin(args);
        });
    };
    /** Change the tiles inside the dragbox to the specified state
        (pending if being dragged over, selected if mouse released normally,
        marked if shift was held) */
    GameController.prototype.applyFillDragBox = function (override) {
        this.dragBoxService.fill(override);
        this.$scope.$apply();
    };
    ;
    GameController.prototype.mouseUpEvent = function (event) {
        this.applyFillDragBox();
        if (this.checkWin()) {
            this.gameOverService.openDialog(this.level);
        }
        this.$scope.$apply();
    };
    /**
    * Compare the current state of the game to the correct state
    */
    GameController.prototype.checkForWin = function () {
        if (this.goalMatrix) {
            return this.gameMatrix.equals(this.goalMatrix);
        }
        else {
            return false;
        }
    };
    ;
    GameController.prototype.checkWin = function () {
        var winner = this.checkForWin();
        if (winner) {
            this.level.won = true;
            this.$scope.$digest();
            return true;
        }
        return false;
    };
    ;
    GameController.prototype.setMargin = function (tileSize) {
        this.margin = Math.floor(tileSize) / 2;
    };
    GameController.prototype.updateGameSize = function () {
        // don't use args, call to getGameSize so we take tutorials into account
        var newGameSettings = this.gameSizeService.getGameSize(false);
        if (newGameSettings) {
            this.gameSettings = {
                width: newGameSettings.gameWidth,
                height: newGameSettings.gameHeight
            };
        }
    };
    ;
    GameController.$controllerAs = 'gameCtrl';
    GameController.$name = 'GameController';
    GameController.$inject = [
        '$element',
        '$scope',
        'eventService',
        'gameOverService',
        'gameSizeService',
        'tileSizeService',
        'dragBoxService'
    ];
    return GameController;
}());
exports.GameController = GameController;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var GameOverComponent_1 = __webpack_require__(60);
var GameOverController_1 = __webpack_require__(61);
var GameOverService_1 = __webpack_require__(62);
exports.default = angular
    .module('levels.gameOver', [])
    .component(GameOverComponent_1.GameOverComponent.$name, new GameOverComponent_1.GameOverComponent())
    .controller(GameOverController_1.GameOverController.$name, GameOverController_1.GameOverController)
    .service(GameOverService_1.GameOverService.$name, GameOverService_1.GameOverService)
    .name;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameOverComponent = /** @class */ (function () {
    function GameOverComponent() {
        this.bindToController = true;
        this.controller = 'GameOverController';
        this.controllerAs = 'gameOverCtrl';
        this.templateUrl = 'modules/levels/gameOver/GameOverView.html';
        this.bindings = {
            closeAction: '&',
            levelId: '@',
            won: '<'
        };
    }
    GameOverComponent.$name = 'gameOver';
    return GameOverComponent;
}());
exports.GameOverComponent = GameOverComponent;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameOverController = /** @class */ (function () {
    function GameOverController(componentDialogService) {
        this.componentDialogService = componentDialogService;
    }
    GameOverController.prototype.$onInit = function () { };
    GameOverController.prototype.newLevel = function () {
        this.closeAction();
        this.componentDialogService.open('level-select');
    };
    GameOverController.$controllerAs = 'gameOverCtrl';
    GameOverController.$name = 'GameOverController';
    GameOverController.$inject = [
        'componentDialogService',
    ];
    return GameOverController;
}());
exports.GameOverController = GameOverController;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Open the Game Over popup */
var GameOverService = /** @class */ (function () {
    function GameOverService(ngDialog) {
        this.ngDialog = ngDialog;
    }
    GameOverService.prototype.openDialog = function (level) {
        this.ngDialog.open({
            plain: true,
            template: "<game-over close-action=\"closeThisDialog()\" level-id=\"" + level.id + "\" won=\"" + level.won + "\"></game-over>",
            showClose: false
        });
    };
    GameOverService.$name = 'gameOverService';
    GameOverService.$inject = [
        'ngDialog'
    ];
    return GameOverService;
}());
exports.GameOverService = GameOverService;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var GameSizeService_1 = __webpack_require__(64);
exports.default = angular
    .module('levels.gameSize', [])
    .service(GameSizeService_1.GameSizeService.$name, GameSizeService_1.GameSizeService)
    .name;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameSizeService = /** @class */ (function () {
    function GameSizeService($rootScope, $timeout, sideLengthService, tileSizeService) {
        this.$rootScope = $rootScope;
        this.$timeout = $timeout;
        this.sideLengthService = sideLengthService;
        this.tileSizeService = tileSizeService;
        this.tutorialDivider = 4;
    }
    /* Take a given game width and subtract border widths. I either have to do this
       or remove border-box and add them instead... doesn't really matter */
    GameSizeService.prototype.adjustForBorders = function (width) {
        var borderWidth = 1;
        /* 18 is a bit of a magic number, I worked backwards from determining how much extra space
            the game had based on sideLength */
        return width - ((borderWidth * this.sideLengthService.sideLength) + (18 - this.sideLengthService.sideLength));
    };
    /** Return the width of the main section of the game so we can calculate game and tile sizes off of it */
    GameSizeService.prototype.calculatePlayableArea = function () {
        var pHeight = window.innerHeight, pWidth = window.innerWidth;
        this.playableAreaSize = Math.min(pHeight, pWidth);
        return Math.floor(this.playableAreaSize);
    };
    /* Return the current game size (width and height in pixels of the game field, changes depending on number of tiles) */
    GameSizeService.prototype.getGameSize = function (tutorialMode) {
        // height/width will probably come in as px
        var intHeight = parseInt(this.gameHeight, 10), intWidth = parseInt(this.gameWidth, 10);
        return {
            gameHeight: tutorialMode ? intHeight / this.tutorialDivider : this.gameHeight,
            gameWidth: tutorialMode ? intWidth / this.tutorialDivider : this.gameWidth
        };
    };
    /* Modify the current game size. */
    GameSizeService.prototype.setGameSize = function (widthInTiles) {
        var _this = this;
        var finalWidth = Math.floor(this.playableAreaSize / 1.6), finalHeight;
        finalWidth = this.adjustForBorders(finalWidth);
        finalHeight = finalWidth;
        this.gameWidth = finalWidth + 'px';
        this.gameHeight = finalHeight + 'px';
        this.$timeout(function () {
            _this.$rootScope.$broadcast('gameSizeChanged', { width: _this.gameWidth, height: _this.gameHeight });
        });
        this.tileSizeService.setTileSize(finalWidth, widthInTiles);
    };
    GameSizeService.$name = 'gameSizeService';
    GameSizeService.$inject = [
        '$rootScope',
        '$timeout',
        'sideLengthService',
        'tileSizeService'
    ];
    return GameSizeService;
}());
exports.GameSizeService = GameSizeService;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var LevelResource_1 = __webpack_require__(66);
var LevelComponent_1 = __webpack_require__(67);
var LevelController_1 = __webpack_require__(68);
var LevelService_1 = __webpack_require__(71);
exports.default = angular
    .module('levels.level', [])
    .component(LevelComponent_1.LevelComponent.$name, new LevelComponent_1.LevelComponent())
    .controller(LevelController_1.LevelController.$name, LevelController_1.LevelController)
    .factory('Levels', LevelResource_1.LevelResource)
    .service(LevelService_1.LevelService.$name, LevelService_1.LevelService)
    .name;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function LevelResource($resource) {
    return $resource('levels/:levelId', { levelId: '@id'
    }, {
        update: {
            method: 'PUT'
        },
        query: {
            isArray: false
        }
    });
}
exports.LevelResource = LevelResource;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LevelComponent = /** @class */ (function () {
    function LevelComponent() {
        this.bindToController = true;
        this.controller = 'LevelController';
        this.controllerAs = 'levelCtrl';
        this.templateUrl = 'modules/levels/level/LevelView.html';
        this.bindings = {
            controller: '@'
        };
    }
    LevelComponent.$name = 'level';
    return LevelComponent;
}());
exports.LevelComponent = LevelComponent;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var GameMatrix_1 = __webpack_require__(69);
'use strict';
var LevelController = /** @class */ (function () {
    function LevelController($http, $scope, $state, $stateParams, $timeout, Authentication, componentDialogService, eventService, gameSizeService, levelService, Levels, ngDialog, shiftService, Utils) {
        this.$http = $http;
        this.$scope = $scope;
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.Authentication = Authentication;
        this.componentDialogService = componentDialogService;
        this.eventService = eventService;
        this.gameSizeService = gameSizeService;
        this.levelService = levelService;
        this.Levels = Levels;
        this.ngDialog = ngDialog;
        this.shiftService = shiftService;
        this.Utils = Utils;
        this.finalLayout = {};
        this.options = {
            size: 25
        };
        this.timeout = 1000;
    }
    LevelController.prototype.$onInit = function () {
        this.selectedLevelId = this.$stateParams['levelId'];
        this.mode = this.$stateParams.mode;
        this.findOne(this.mode);
    };
    LevelController.prototype.$postLink = function () {
        var _this = this;
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', function (e, args) {
            var newSize = Math.floor(args);
            _this.margin = newSize / 2;
        });
    };
    LevelController.prototype.clearAll = function () {
        this.Utils.clearAll();
    };
    LevelController.prototype.confirmClear = function () {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            plain: true,
            scope: this.$scope,
            showClose: false,
            template: "<confirmation\n                        cancel-action=\"closeThisDialog()\"\n                        confirm-action=\"confirm()\"\n                        submit-action=\"levelCtrl.clearAll()\"\n                        submit-text=\"Clear\"></confirmation>"
        });
    };
    ;
    LevelController.prototype.confirmRemove = function () {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            plain: true,
            scope: this.$scope,
            showClose: false,
            template: "<confirmation\n                        cancel-action=\"closeThisDialog()\"\n                        confirm-action=\"confirm()\"\n                        submit-action=\"levelCtrl.removeCurrentLevel()\"\n                        submit-text=\"Delete\"></confirmation>"
        });
    };
    ;
    LevelController.prototype.confirmUpdate = function () {
        this.ngDialog.openConfirm({
            closeByDocument: false,
            plain: true,
            scope: this.$scope,
            showClose: false,
            template: "<confirmation\n                        cancel-action=\"closeThisDialog()\"\n                        confirm-action=\"confirm()\"\n                        submit-action=\"levelCtrl.update()\"\n                        submit-text=\"Update\"></confirmation>"
        });
    };
    ;
    /** Create new Level (submit function) */
    LevelController.prototype.create = function (level, successFunc, failFunc) {
        // Redirect after save
        level.$save(function (response) {
            if (typeof successFunc === 'function') {
                successFunc(response);
            }
        }, function (errorResponse) {
            if (typeof failFunc === 'function') {
                failFunc(errorResponse);
            }
        });
    };
    LevelController.prototype.createGameArray = function (controller) {
        this.Utils.createNewGame({
            numberOfTiles: this.options.size,
            controller: controller
        });
    };
    // Create new level (load template)
    LevelController.prototype.createNewLevel = function () {
        var action = 'new';
        var oldLevel = angular.copy(this.level);
        this.clearAll();
        this.level = undefined;
        this.createGameArray(action);
        this.getLayoutForRepeater(action);
        this.level = {
            currentView: action,
            ready: true,
            name: oldLevel ? oldLevel.name : ''
        };
        this.gameMatrix = new GameMatrix_1.GameMatrix(this.Utils.getGameMatrix(), false);
    };
    // Find existing Level
    LevelController.prototype.findOne = function (mode) {
        var _this = this;
        this.finalLayout = {};
        this.level = null;
        // store the name of the controller so we can have the same functions do different things
        // depending on new, edit, etc.
        this.mode = mode;
        if (this.selectedLevelId) {
            this.Levels.get({
                levelId: this.selectedLevelId
            }).$promise.then(function (data) {
                _this.level = data;
                _this.setRating();
                _this.level.layout = _this.levelService.decodeLayout(data.layout);
                var flatLayout = _this.Utils.flatten(_this.level.layout);
                _this.gameSizeService.calculatePlayableArea();
                _this.Utils.createNewGame({
                    numberOfTiles: flatLayout.length,
                    layout: _this.level.layout,
                    controller: mode
                });
                _this.gameMatrix = new GameMatrix_1.GameMatrix(_this.Utils.getGameMatrix(), mode == 'edit');
                var goalLayout = _this.Utils.getGoalMatrix();
                if (goalLayout) {
                    _this.goalMatrix = new GameMatrix_1.GameMatrix(goalLayout, true);
                }
                _this.getLayoutForRepeater(mode, _this.level.layout);
                _this.level.currentView = mode;
                _this.level.won = false;
                _this.level.ready = true;
            });
        }
        else {
            this.createNewLevel();
        }
    };
    LevelController.prototype.getLayoutForRepeater = function (mode, layout) {
        // use finalLayout from above to prevent calculating this more than once 
        var layoutForRepeater;
        switch (mode) {
            case 'view':
            case 'edit':
                layoutForRepeater = this.Utils.flatten(layout);
                break;
            case 'new':
                layoutForRepeater = this.getSize();
                break;
        }
        // these should be an object so i don't have to track by $index, which causes rendering issues
        this.finalLayout.tiles = layoutForRepeater.map(function (value) {
            return {
                selected: value
            };
        });
    };
    LevelController.prototype.getSize = function () {
        var gameMatrix = this.Utils.getGameMatrix();
        return gameMatrix.flatten();
    };
    LevelController.prototype.keydown = function ($event) {
        if ($event.shiftKey) {
            this.shiftService.shiftOn = true;
        }
    };
    LevelController.prototype.keyup = function ($event) {
        if (!$event.shiftKey) {
            this.shiftService.shiftOn = false;
        }
    };
    /* Doing this old school until I figure out a better way */
    LevelController.prototype.rate = function () {
        var _this = this;
        this.$timeout(function () {
            var url = '/levels/' + _this.level.id + '/ratings';
            var post_data = {
                rating: _this.level.yourRating
            };
            _this.$http.post(url, post_data).then(function () {
                console.log('omg');
            });
        });
    };
    /** Remove any Level passed in */
    LevelController.prototype.remove = function (level) {
        var _this = this;
        if (level) {
            level.$remove(function () {
                _this.componentDialogService.open('level-select');
            });
        }
    };
    /** Remove the level you're looking at */
    LevelController.prototype.removeCurrentLevel = function () {
        this.remove(this.level);
    };
    /** This should be done on the server side, todo */
    LevelController.prototype.setRating = function () {
        if (this.level.ratings && this.level.ratings.length) {
            this.level.yourRating = this.level.ratings[0].rating;
        }
    };
    // Split out for easier testing
    LevelController.prototype.submitCreate = function () {
        var _this = this;
        // Create new Level object
        var level = new this.Levels({
            name: this.level.name,
            layout: this.gameMatrix.horizontal.getLayout(),
            size: this.gameMatrix.horizontal.length
        });
        var levelSaveSuccess = function (response) {
            _this.$state.go('update-level', { levelId: response.id }, { reload: true });
        };
        var levelSaveFailure = function (err) {
            _this.error = err.data.message;
            _this.$timeout(function () {
                _this.error = '';
            }, _this.timeout);
        };
        this.create(level, levelSaveSuccess, levelSaveFailure);
    };
    // Update existing Level
    LevelController.prototype.update = function () {
        this.updateLevel(this.level);
    };
    ;
    LevelController.prototype.updateLevel = function (level) {
        var _this = this;
        level.size = level.layout.length;
        level.$update(function () {
            _this.$state.go('update-level', { levelId: level.id }, { reload: true });
        }, function (errorResponse) {
            var _this = this;
            this.error = errorResponse.data.message;
            this.$timeout(function () {
                _this.error = null;
            }, this.timeout);
        });
    };
    LevelController.$controllerAs = 'levelCtrl';
    LevelController.$name = 'LevelController';
    LevelController.$inject = [
        '$http',
        '$scope',
        '$state',
        '$stateParams',
        '$timeout',
        'Authentication',
        'componentDialogService',
        'eventService',
        'gameSizeService',
        'levelService',
        'Levels',
        'ngDialog',
        'shiftService',
        'Utils'
    ];
    return LevelController;
}());
exports.LevelController = LevelController;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BooleanMatrix_1 = __webpack_require__(2);
var GameMatrix = /** @class */ (function () {
    function GameMatrix(layout, initialize) {
        this.horizontal = new BooleanMatrix_1.BooleanMatrix(layout.length, layout.length);
        if (initialize) {
            this.horizontal.copyFrom(layout);
        }
        this.vertical = this.horizontal.rotate();
    }
    GameMatrix.prototype.equals = function (other) {
        return this.horizontal.equals(other.horizontal);
    };
    GameMatrix.prototype.setValueAt = function (row, column, value) {
        this.horizontal.setValueAt(row, column, value);
        this.vertical = this.horizontal.rotate();
    };
    return GameMatrix;
}());
exports.GameMatrix = GameMatrix;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
/**
 * Container for a 2D array
 * A lot of this still assumes all matrices are square. Will fix if ever necessary.
 */
var Matrix = /** @class */ (function () {
    function Matrix(rowCount, colCount) {
        this.matrix = this.createMatrix(rowCount, colCount);
    }
    Object.defineProperty(Matrix.prototype, "length", {
        get: function () {
            return this.matrix.length;
        },
        enumerable: true,
        configurable: true
    });
    Matrix.prototype.createMatrix = function (rowCount, colCount) {
        var finalMatrix = [];
        for (var i = 0; i < rowCount; i++) {
            finalMatrix.push(new Array(colCount));
        }
        return finalMatrix;
    };
    Matrix.prototype.copyFrom = function (source) {
        this.matrix = source.matrix;
    };
    /** Return a COPY of the current layout to preserve encapsulation -- you shouldn't be able to modify a matrix by normal means */
    Matrix.prototype.getLayout = function () {
        return angular.copy(this.matrix);
    };
    Matrix.prototype.equals = function (other) {
        return angular.equals(this.matrix, other.matrix);
    };
    Matrix.prototype.initializeWith = function (values) {
        this.matrix = values;
    };
    /* Perform the passed-in function on every cell of the matrix */
    Matrix.prototype.iterate = function (fn) {
        var rowLen = this.matrix.length;
        for (var i = 0; i < rowLen; i++) {
            var columnLen = this.matrix[i].length;
            for (var j = 0; j < columnLen; j++) {
                fn(i, j);
            }
        }
    };
    Matrix.prototype.clear = function () {
    };
    Matrix.prototype.flatten = function () {
        return Array.prototype.concat.apply([], this.matrix);
    };
    /** Create a new matrix of equal size to the one passed in, and assign it to the original rotated 90 degrees */
    Matrix.prototype.rotate = function () {
        var _this = this;
        var rotatedMatrix = new Matrix(this.matrix.length, this.matrix.length);
        rotatedMatrix.iterate(function (row, column) {
            var y = _this.matrix.length - row - 1;
            var x = column;
            rotatedMatrix.setValueAt(column, row, _this.matrix[y][x]);
        });
        return rotatedMatrix;
    };
    Matrix.prototype.getValueAt = function (row, column) {
        return this.matrix[row][column];
    };
    Matrix.prototype.setValueAt = function (row, column, value) {
        this.matrix[row][column] = value;
    };
    return Matrix;
}());
exports.Matrix = Matrix;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LevelService = /** @class */ (function () {
    function LevelService() {
    }
    /**
     * Converts a base64 string that decodes into a binary string into a layout
     * This assumes the layout was square, like most everything else
     */
    LevelService.prototype.decodeLayout = function (layout) {
        // base64 string to binary string
        var binary = atob(layout);
        // how many characters of that binary string we should grab at once
        var sideLength = Math.sqrt(binary.length);
        var regexp = new RegExp('.{1,' + sideLength + '}', 'g');
        // evenly split up binary strings
        var split = binary.match(regexp);
        // convert to actual layout
        var resultLayout = split.map(function (binaryString) {
            return binaryString.split('').map(function (value) {
                return value === '1';
            });
        });
        return resultLayout;
    };
    LevelService.$name = 'levelService';
    LevelService.$inject = [];
    return LevelService;
}());
exports.LevelService = LevelService;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var LevelSelectComponent_1 = __webpack_require__(73);
var LevelSelectController_1 = __webpack_require__(74);
exports.default = angular
    .module('levels.levelSelect', [])
    .component(LevelSelectComponent_1.LevelSelectComponent.$name, new LevelSelectComponent_1.LevelSelectComponent())
    .controller(LevelSelectController_1.LevelSelectController.$name, LevelSelectController_1.LevelSelectController)
    .name;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LevelSelectComponent = /** @class */ (function () {
    function LevelSelectComponent() {
        this.bindToController = true;
        this.controller = 'LevelSelectController';
        this.controllerAs = 'levelSelectCtrl';
        this.templateUrl = 'modules/levels/levelSelect/LevelSelectView.html';
        this.bindings = {
            closeAction: '&'
        };
    }
    LevelSelectComponent.$name = 'levelSelect';
    return LevelSelectComponent;
}());
exports.LevelSelectComponent = LevelSelectComponent;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LevelSelectController = /** @class */ (function () {
    function LevelSelectController(Authentication, Levels, Utils) {
        this.Authentication = Authentication;
        this.Levels = Levels;
        this.Utils = Utils;
        this.currentPage = 0;
        this.sizeRestriction = '';
        this.searchText = '';
        this.sortBy = '"createdAt"';
        this.sortDirection = '';
    }
    LevelSelectController.prototype.$onInit = function () { };
    /* Find a list of levels */
    LevelSelectController.prototype.find = function (currentPage) {
        var _this = this;
        this.currentPage = currentPage;
        var queryObj = {
            pageNum: currentPage,
            sizeRestriction: this.sizeRestriction,
            searchText: this.searchText,
            sortBy: this.sortBy,
            sortDirection: this.sortDirection
        };
        this.Levels.query(queryObj, function (data) {
            var i = 0, allLevels = data.levels, len = allLevels ? allLevels.length : 0, currentLevel;
            _this.totalPages = Math.ceil(data.count / data.numPerPage);
            _this.levels = data.levels;
            // Calculate the size for each level so we can display it to the screen & sort by size
            for (; i < len; i++) {
                currentLevel = allLevels[i];
                currentLevel.prettySize = _this.Utils.prettySize(currentLevel.size);
            }
        });
    };
    LevelSelectController.prototype.toggleShowFilter = function () {
        this.showFilter = !this.showFilter;
    };
    LevelSelectController.$controllerAs = 'levelSelectCtrl';
    LevelSelectController.$name = 'LevelSelectController';
    LevelSelectController.$inject = [
        'Authentication',
        'Levels',
        'Utils'
    ];
    return LevelSelectController;
}());
exports.LevelSelectController = LevelSelectController;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ModeSelectorComponent_1 = __webpack_require__(76);
var ModeSelectorController_1 = __webpack_require__(77);
exports.default = angular
    .module('levels.modeSelector', [])
    .component(ModeSelectorComponent_1.ModeSelectorComponent.$name, new ModeSelectorComponent_1.ModeSelectorComponent())
    .controller(ModeSelectorController_1.ModeSelectorController.$name, ModeSelectorController_1.ModeSelectorController)
    .name;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModeSelectorComponent = /** @class */ (function () {
    function ModeSelectorComponent() {
        this.controller = 'ModeSelectorController';
        this.controllerAs = 'modeSelectorCtrl';
        this.templateUrl = 'modules/levels/modeSelector/ModeSelectorView.html';
        this.bindings = {};
        this.bindToController = true;
    }
    ModeSelectorComponent.$name = 'modeSelector';
    return ModeSelectorComponent;
}());
exports.ModeSelectorComponent = ModeSelectorComponent;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ModeSelectorController = /** @class */ (function () {
    function ModeSelectorController(shiftService) {
        this.shiftService = shiftService;
    }
    ModeSelectorController.prototype.$onInit = function () {
        var _this = this;
        this.modes = [
            {
                name: 'Select',
                onSelect: function () { return _this.shiftService.shiftLock = false; }
            },
            {
                name: 'Mark',
                onSelect: function () { return _this.shiftService.shiftLock = true; }
            }
        ];
        this.selectMode(this.modes[0]);
    };
    ModeSelectorController.prototype.selectMode = function (mode) {
        this.selectedMode = mode.name;
        mode.onSelect();
    };
    ModeSelectorController.$name = 'ModeSelectorController';
    ModeSelectorController.$inject = [
        'shiftService'
    ];
    return ModeSelectorController;
}());
exports.ModeSelectorController = ModeSelectorController;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var NumberGridComponent_1 = __webpack_require__(79);
var NumberGridController_1 = __webpack_require__(80);
exports.default = angular
    .module('levels.numberGrid', [])
    .component(NumberGridComponent_1.NumberGridComponent.$name, new NumberGridComponent_1.NumberGridComponent())
    .controller(NumberGridController_1.NumberGridController.$name, NumberGridController_1.NumberGridController)
    .name;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NumberGridComponent = /** @class */ (function () {
    function NumberGridComponent() {
        this.controller = 'NumberGridController';
        this.controllerAs = 'numGridCtrl';
        this.templateUrl = 'modules/levels/numberGrid/NumberGridView.html';
        this.bindings = {
            gameMatrix: '<',
            goalMatrix: '<',
            orientation: '@',
        };
        this.bindToController = true;
    }
    NumberGridComponent.$name = 'numberGrid';
    return NumberGridComponent;
}());
exports.NumberGridComponent = NumberGridComponent;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NumberGridController = /** @class */ (function () {
    function NumberGridController($scope, eventService, tileSizeService) {
        this.$scope = $scope;
        this.eventService = eventService;
        this.tileSizeService = tileSizeService;
    }
    NumberGridController.prototype.$onInit = function () {
        this.isVertical = this.orientation === 'vertical';
        this.setTileSize();
    };
    NumberGridController.prototype.$postLink = function () {
        var _this = this;
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', function () {
            _this.setTileSize();
        });
    };
    NumberGridController.prototype.setTileSize = function () {
        this.tileSize = this.tileSizeService.getTileSizePx();
    };
    NumberGridController.prototype.getFontSize = function () {
        return parseInt(this.tileSize, 10) / 2 + 'px';
    };
    NumberGridController.$name = 'NumberGridController';
    NumberGridController.$inject = [
        '$scope',
        'eventService',
        'tileSizeService'
    ];
    return NumberGridController;
}());
exports.NumberGridController = NumberGridController;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var NumberLineComponent_1 = __webpack_require__(82);
var NumberLineController_1 = __webpack_require__(83);
exports.default = angular
    .module('levels.numberLine', [])
    .component(NumberLineComponent_1.NumberLineComponent.$name, new NumberLineComponent_1.NumberLineComponent())
    .controller(NumberLineController_1.NumberLineController.$name, NumberLineController_1.NumberLineController)
    .name;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NumberLineComponent = /** @class */ (function () {
    function NumberLineComponent() {
        this.controller = 'NumberLineController';
        this.controllerAs = 'numLineCtrl';
        this.templateUrl = 'modules/levels/numberLine/NumberLineView.html';
        this.bindings = {
            index: '<',
            orientation: '@',
            gameMatrix: '<',
            goalMatrix: '<'
        };
        this.bindToController = true;
    }
    NumberLineComponent.$name = 'numberLine';
    return NumberLineComponent;
}());
exports.NumberLineComponent = NumberLineComponent;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileGroup_1 = __webpack_require__(84);
'use strict';
var NumberLineController = /** @class */ (function () {
    function NumberLineController(sideLengthService, tileSizeService) {
        this.sideLengthService = sideLengthService;
        this.tileSizeService = tileSizeService;
        this.cssClass = '';
        this.lineContent = [];
        this.currentGroup = new TileGroup_1.TileGroup();
        this.hasGroup = false;
    }
    NumberLineController.prototype.$onInit = function () {
        this.sideLength = this.sideLengthService.sideLength;
    };
    // display a crossed out 0 if the linecontent comes back with no content. otherwise, pass through
    NumberLineController.prototype.accountForZeros = function (lineContent) {
        if (lineContent.length === 0) {
            return [{
                    finished: true,
                    text: 0
                }];
        }
        else {
            return lineContent;
        }
    };
    /* When computing number lines for the top part, we need to reverse the results
        before joining them for display, so they will appear in the correct order */
    NumberLineController.prototype.adjustContentForOrientation = function (lineContent, orientation) {
        if (orientation === 'vertical') {
            lineContent = lineContent.reverse();
        }
        ;
        return lineContent;
    };
    /* Given a matrix index for a row or column and an indication for which it is,
        calculate groups of consective tiles in that row or column */
    NumberLineController.prototype.calculateGroup = function (index, orientation) {
        var groupCount = 0;
        var currentGroup = new TileGroup_1.TileGroup();
        var resetInd = true;
        var coord = { x: undefined, y: undefined };
        // Loop through the row, building a separate count for each group of consecutive true tiles
        for (var i = 0; i < this.sideLength; i++) {
            // If the rotated goal matrix contains a true tile at the current index...
            if (this.goalMatrix.getValueAt(index, i)) {
                if (!currentGroup[groupCount]) {
                    currentGroup[groupCount] = [];
                }
                // Add the tile to the grouping.
                currentGroup[groupCount].push({
                    coord: {
                        y: index,
                        x: i
                    },
                    currentValue: this.gameMatrix.getValueAt(index, i),
                    goalValue: this.goalMatrix.getValueAt(index, i)
                });
                resetInd = true;
            }
            else {
                if (resetInd) {
                    groupCount++;
                }
                resetInd = false;
            }
        }
        ;
        return currentGroup;
    };
    /* To compute the number lines for the current row or column, we need to find the length of each grouping */
    NumberLineController.prototype.getGroupings = function (currentGroup) {
        return Object.keys(currentGroup).map(function (value, index) {
            return {
                finished: false,
                text: currentGroup[value].length
            };
        });
    };
    /* For a given row or column, compute its number line (guide numbers on the sides of the board) */
    NumberLineController.prototype.getLineContent = function () {
        if (!this.hasGroup) {
            this.currentGroup = this.calculateGroup(this.index, this.orientation);
            this.hasGroup = true;
            this.lineContent = this.accountForZeros(this.adjustContentForOrientation(this.getGroupings(this.currentGroup), this.orientation));
        }
        return this.lineContent;
    };
    NumberLineController.prototype.getHeight = function () {
        var tileSize = this.tileSizeService.getTileSize();
        return this.orientation === 'vertical' ? (tileSize / 2) + 'px' : tileSize + 'px';
    };
    NumberLineController.prototype.getWidth = function () {
        var tileSize = this.tileSizeService.getTileSize();
        return this.orientation === 'horizontal' ? (tileSize / 2) + 'px' : tileSize + 'px';
    };
    NumberLineController.$inject = [
        'sideLengthService',
        'tileSizeService'
    ];
    NumberLineController.$name = 'NumberLineController';
    return NumberLineController;
}());
exports.NumberLineController = NumberLineController;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileGroup = /** @class */ (function () {
    function TileGroup() {
    }
    return TileGroup;
}());
exports.TileGroup = TileGroup;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ShellComponent_1 = __webpack_require__(86);
var ShellController_1 = __webpack_require__(87);
exports.default = angular
    .module('levels.shell', [])
    .component(ShellComponent_1.ShellComponent.$name, new ShellComponent_1.ShellComponent())
    .controller(ShellController_1.ShellController.$name, ShellController_1.ShellController)
    .name;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Enable us to share an instance of levelCtrl between the header & the level */
var ShellComponent = /** @class */ (function () {
    function ShellComponent() {
        this.bindToController = true;
        this.controller = 'ShellController';
        this.controllerAs = 'shellCtrl';
        this.transclude = true;
        this.template = "\n      <krossr-header data-level=\"level\"></krossr-header>\n      <section id=\"main-section\" class=\"content\" resize>\n        <ng-transclude></ng-transclude>\n      </section> \n    ";
    }
    ShellComponent.$name = 'krossrShell';
    return ShellComponent;
}());
exports.ShellComponent = ShellComponent;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ShellController = /** @class */ (function () {
    function ShellController() {
    }
    ShellController.$controllerAs = 'shellCtrl';
    ShellController.$name = 'ShellController';
    ShellController.$inject = [];
    return ShellController;
}());
exports.ShellController = ShellController;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ShiftService_1 = __webpack_require__(89);
exports.default = angular
    .module('levels.shiftService', [])
    .service(ShiftService_1.ShiftService.$name, ShiftService_1.ShiftService)
    .name;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ShiftService = /** @class */ (function () {
    function ShiftService() {
        this._shiftLock = false;
        this._shiftOn = false;
    }
    Object.defineProperty(ShiftService.prototype, "shiftOn", {
        get: function () {
            return this._shiftLock || this._shiftOn;
        },
        set: function (value) {
            this._shiftOn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShiftService.prototype, "shiftLock", {
        set: function (value) {
            this._shiftLock = value;
        },
        enumerable: true,
        configurable: true
    });
    ShiftService.$name = 'shiftService';
    return ShiftService;
}());
exports.ShiftService = ShiftService;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var StarRatingComponent_1 = __webpack_require__(91);
var StarRatingController_1 = __webpack_require__(92);
exports.default = angular
    .module('levels.starRating', [])
    .component(StarRatingComponent_1.StarRatingComponent.$name, new StarRatingComponent_1.StarRatingComponent())
    .controller(StarRatingController_1.StarRatingController.$name, StarRatingController_1.StarRatingController)
    .name;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StarRatingComponent = /** @class */ (function () {
    function StarRatingComponent() {
        this.bindToController = true;
        this.controller = 'StarRatingController';
        this.controllerAs = 'starRatingCtrl';
        this.templateUrl = 'modules/levels/starRating/StarRatingView.html';
        this.bindings = {
            ratingValue: '=ngModel',
            max: '<?',
            onRatingSelected: '&?',
            readOnly: '<?readonly'
        };
    }
    StarRatingComponent.$name = 'starRating';
    return StarRatingComponent;
}());
exports.StarRatingComponent = StarRatingComponent;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var StarRatingController = /** @class */ (function () {
    function StarRatingController($scope) {
        this.$scope = $scope;
        this.max = 5;
    }
    StarRatingController.prototype.updateStars = function () {
        this.stars = [];
        for (var i = 0; i < this.max; i++) {
            this.stars.push({
                filled: i < this.ratingValue
            });
        }
    };
    StarRatingController.prototype.$onInit = function () {
        this.updateStars();
    };
    StarRatingController.prototype.toggle = function (index) {
        if (!this.readOnly) {
            this.ratingValue = index + 1;
            this.onRatingSelected({
                rating: this.ratingValue
            });
            this.updateStars();
        }
    };
    StarRatingController.$controllerAs = 'starRatingCtrl';
    StarRatingController.$name = 'StarRatingController';
    StarRatingController.$inject = [
        '$scope'
    ];
    return StarRatingController;
}());
exports.StarRatingController = StarRatingController;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var SideLengthService_1 = __webpack_require__(94);
exports.default = angular
    .module('levels.sideLengthService', [])
    .service(SideLengthService_1.SideLengthService.$name, SideLengthService_1.SideLengthService)
    .name;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Keeps track of the length of a side for a game -- it is used in many calculations & in many places */
var SideLengthService = /** @class */ (function () {
    function SideLengthService() {
    }
    Object.defineProperty(SideLengthService.prototype, "sideLength", {
        get: function () {
            return this._sideLength;
        },
        set: function (length) {
            this._sideLength = length;
        },
        enumerable: true,
        configurable: true
    });
    SideLengthService.$name = 'sideLengthService';
    return SideLengthService;
}());
exports.SideLengthService = SideLengthService;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var TileComponent_1 = __webpack_require__(96);
var TileController_1 = __webpack_require__(97);
var TileService_1 = __webpack_require__(98);
exports.default = angular
    .module('levels.tile', [])
    .component(TileComponent_1.TileComponent.$name, new TileComponent_1.TileComponent())
    .controller(TileController_1.TileController.$name, TileController_1.TileController)
    .service(TileService_1.TileService.$name, TileService_1.TileService)
    .name;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileComponent = /** @class */ (function () {
    function TileComponent() {
        this.bindToController = true;
        this.controller = 'TileController';
        this.controllerAs = 'tileCtrl';
        this.templateUrl = 'modules/levels/tile/TileView.html';
        this.bindings = {
            gameMatrix: '<',
            index: '<',
            level: '<',
            tiles: '<'
        };
    }
    TileComponent.$name = 'tile';
    return TileComponent;
}());
exports.TileComponent = TileComponent;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileState_1 = __webpack_require__(1);
'use strict';
var TileController = /** @class */ (function () {
    function TileController($attrs, $element, $scope, Utils, dragBoxService, eventService, gameOverService, shiftService, sideLengthService, tileService, tileSizeService, touchService) {
        this.$attrs = $attrs;
        this.$element = $element;
        this.$scope = $scope;
        this.Utils = Utils;
        this.dragBoxService = dragBoxService;
        this.eventService = eventService;
        this.gameOverService = gameOverService;
        this.shiftService = shiftService;
        this.sideLengthService = sideLengthService;
        this.tileService = tileService;
        this.tileSizeService = tileSizeService;
        this.touchService = touchService;
    }
    TileController.prototype.$onInit = function () {
        this.editable = this.$attrs['editable'];
        this.isEditMode = this.level.currentView === 'edit';
        this.goalMatrix = this.Utils.getGoalMatrix();
        this.initializeFill();
    };
    TileController.prototype.$postLink = function () {
        var _this = this;
        this.setTileSize(this.tileSizeService.getTileSize());
        this.tileService.addTile({ tileCtrl: this });
        this.$element.on('mousedown', function (e) { return _this.mouseDownEvent(e); });
        this.$element.on('mousemove', function (e) { return _this.mouseMoveEvent(e); });
        this.$element.on('mouseup', function (e) { return _this.mouseUpEvent(e); });
        this.$element.on('touchstart', function (e) {
            e.preventDefault();
            _this.mouseDownEvent(e);
        });
        this.$element.on('touchmove', function (e) {
            e.preventDefault();
            _this.mouseMoveEvent(e);
        });
        this.$element.on('touchend', function (e) {
            e.preventDefault();
            _this.mouseUpEvent(e);
        });
        this.eventService.subscribe(this.$scope, 'tileSizeChanged', function () {
            _this.setTileSize(_this.tileSizeService.getTileSize());
        });
    };
    TileController.prototype.clearPending = function (coords) {
        this.tileService.fillTiles(coords, true, TileState_1.TileState.empty, 'isPendingAndNotSelected');
    };
    /** If the override value (which will be the value of the tile that a dragstart is activated on)
     *  is present, use that for all tiles being considered.
     *  This is so you don't unselect previously selected tiles if your drags overlap
     */
    TileController.prototype.checkForOverride = function (override, value) {
        if (typeof override !== 'undefined') {
            return !override;
        }
        else {
            return !value;
        }
    };
    /**
     * Determine the initial state of the tile fills
     */
    TileController.prototype.initializeFill = function () {
        if (this.isEditMode && this.tiles && this.tiles[this.index] && this.tiles[this.index].selected) {
            this.fill(TileState_1.TileState.selected);
        }
        else {
            this.fill(TileState_1.TileState.empty);
        }
    };
    TileController.prototype.fillPending = function (index) {
        var coord = this.tileService.convertTo2D(index), coordsToClear, i = 0, len, currentCoord, currentTileController;
        // save a snapshot of the previous dragbox for comparison purposes
        var oldCoords = this.dragBoxService.process();
        // set the current coordinate to the new dragbox end and compute the new dragbox
        this.dragBoxService.endCoord = coord;
        var allPendingCoords = this.dragBoxService.process();
        // we should only clear the old coordinates off if the current selected area is
        // smaller than the previous selected area, for speed reasons
        if (allPendingCoords &&
            oldCoords &&
            allPendingCoords.length < oldCoords.length) {
            // more speed -- only clear the values that are present in
            // oldCoords but not allPendingCoords
            coordsToClear = oldCoords.filter(function (e) {
                if (allPendingCoords.indexOfObject(e) === -1)
                    return true;
            });
            this.clearPending(coordsToClear);
        }
        this.tileService.fillTiles(allPendingCoords, true, TileState_1.TileState.pending, 'isNotPending');
        this.$scope.$apply();
    };
    TileController.prototype.mouseDownEvent = function (event) {
        var coord = this.tileService.convertTo2D(this.index);
        this.dragBoxService.startCoord = coord;
        this.dragBoxService.initState = this.selected;
    };
    TileController.prototype.mouseMoveEvent = function (event) {
        var actualScope = this.touchService.getTargetScope(event);
        if (actualScope && actualScope.tileCtrl.index) {
            if (this.dragBoxService.validateStart()) {
                this.fillPending(actualScope.tileCtrl.index);
            }
        }
    };
    /*
    * This event bubbles up to GameController, which completes the job
    */
    TileController.prototype.mouseUpEvent = function (event) {
        var actualScope = this.touchService.getTargetScope(event);
        var coord;
        if (actualScope && actualScope.tileCtrl.hasOwnProperty('index')) {
            coord = this.tileService.convertTo2D(actualScope.tileCtrl.index);
            this.dragBoxService.endCoord = coord;
        }
    };
    TileController.prototype.change = function (index, initState, changeTo) {
        if (this.editable === 'true') {
            this.changeTile(index, initState, changeTo, this.goalMatrix);
        }
    };
    TileController.prototype.changeTile = function (index, initState, changeTo, goalMatrix) {
        var coord;
        if (typeof index === 'number') {
            coord = this.tileService.convertTo2D(index);
        }
        else {
            coord = index;
        }
        if (changeTo in TileState_1.TileState) {
            this.fill(changeTo);
        }
        else {
            if (this.shiftService.shiftOn === true) {
                this.fill(this.marked ? TileState_1.TileState.empty : TileState_1.TileState.marked);
                this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
            }
            else {
                this.fill(this.selected ? TileState_1.TileState.empty : TileState_1.TileState.selected, initState);
                this.gameMatrix.setValueAt(coord.y, coord.x, this.selected);
            }
        }
    };
    TileController.prototype.fill = function (fillType, override) {
        switch (fillType) {
            case TileState_1.TileState.pending:
                this.pending = true;
                break;
            case TileState_1.TileState.marked:
                this.marked = true;
                this.selected = false;
                this.pending = false;
                break;
            case TileState_1.TileState.selected:
                this.selected = this.checkForOverride(override, this.selected);
                this.marked = false;
                this.pending = false;
                break;
            case TileState_1.TileState.empty:
                this.selected = false;
                this.marked = false;
                this.pending = false;
                break;
            default:
                console.log("you done goofed");
                break;
        }
    };
    TileController.prototype.fillBorders = function (direction, index) {
        return this.getBorderColors(direction, index);
    };
    /* Determine which tiles to add colored borders to */
    TileController.prototype.getBorderColors = function (direction, index) {
        var canColor;
        var coord = this.tileService.convertTo2D(index);
        var sideLength = this.sideLengthService.sideLength;
        // no borders through puzzle for small puzzles
        if (sideLength <= 5) {
            return;
        }
        switch (direction) {
            case 'left':
                canColor = this.testTileForBorder(sideLength, coord.x);
                break;
            case 'right':
                canColor = this.testTileForBorder(sideLength, coord.x + 1);
                break;
            case 'bottom':
                canColor = this.testTileForBorder(sideLength, coord.y + 1);
                break;
            case 'top':
                canColor = this.testTileForBorder(sideLength, coord.y);
            default:
                break;
        }
        if (canColor) {
            return "1px solid #222";
        }
    };
    /** used with the validationFn in tileService.fillTiles */
    TileController.prototype.isPendingAndNotSelected = function () {
        return this.pending && !this.selected;
    };
    /** used with the validationFn in tileService.fillTiles */
    TileController.prototype.isNotPending = function () {
        return !this.pending;
    };
    TileController.prototype.setTileSize = function (tileSize) {
        tileSize = Math.floor(tileSize);
        this.width = tileSize + 'px';
        this.height = tileSize + 'px';
    };
    ;
    /** We want to add colored borders to every 5th tile, unless it is at the beginning or end of a column or row */
    TileController.prototype.testTileForBorder = function (sideLength, index) {
        return (index % 5 === 0
            && index % sideLength !== 0);
    };
    ;
    TileController.$controllerAs = 'tileCtrl';
    TileController.$name = 'TileController';
    TileController.$inject = [
        '$attrs',
        '$element',
        '$scope',
        'Utils',
        'dragBoxService',
        'eventService',
        'gameOverService',
        'shiftService',
        'sideLengthService',
        'tileService',
        'tileSizeService',
        'touchService'
    ];
    return TileController;
}());
exports.TileController = TileController;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileState_1 = __webpack_require__(1);
'use strict';
/**
 * Keeps a cache of the tiles on the screen for faster access (smooth animation for dragging & selecting),
 * as well as methods for accessing it
 */
var TileService = /** @class */ (function () {
    function TileService(sideLengthService) {
        this.sideLengthService = sideLengthService;
        this.tileIndex = [];
    }
    /** Convert a 2D coordinate into an index */
    TileService.prototype.convertTo1D = function (coord) {
        return (coord.y * this.sideLengthService.sideLength) + coord.x;
    };
    /** Append the current tile index */
    TileService.prototype.addTile = function (obj) {
        this.tileIndex.push(obj);
    };
    /** Make sure the index is clean before we add to it, to avoid bugs with switching between screens */
    TileService.prototype.clearTileIndex = function () {
        this.tileIndex = [];
    };
    /** Convert an index into a 2D coordinate */
    TileService.prototype.convertTo2D = function (index) {
        var x = index % this.sideLengthService.sideLength;
        var y = (index - x) / this.sideLengthService.sideLength;
        var coord = {
            y: y,
            x: x
        };
        return coord;
    };
    /** Empty out all of the tiles, but keep them on-screen */
    TileService.prototype.eraseTiles = function () {
        var len = this.tileIndex.length;
        for (var i = 0; i < len; i++) {
            this.tileIndex[i].tileCtrl.fill(TileState_1.TileState.empty);
        }
    };
    /**
    * Fill all of the tiles in the specified coordinate array
    * @params {Array} array of coordinate objects
    * @params {function} a function to run on each tile controller before changing it to determine whether or not to change. must be defined in TileController
    */
    TileService.prototype.fillTiles = function (coords, initState, override, validationFn) {
        var len = coords.length;
        for (var i = 0; i < len; i++) {
            var currentCoord = coords[i];
            var currentTileController = this.findTileCtrlByCoord(currentCoord);
            if (!validationFn || (typeof currentTileController[validationFn] === 'function' && currentTileController[validationFn]())) {
                currentTileController.change(currentCoord, initState, override);
            }
        }
    };
    /** Grab a tile controller out of the tile index from a given 2D coordinate */
    TileService.prototype.findTileCtrlByCoord = function (coord) {
        var index = this.convertTo1D(coord);
        return this.findTileCtrlByIndex(index);
    };
    /** Grab a tile controller out of the tile index from a given 1D index */
    TileService.prototype.findTileCtrlByIndex = function (index) {
        return this.tileIndex[index].tileCtrl;
    };
    /** Return the current tileIndex */
    TileService.prototype.getTileIndex = function () {
        return this.tileIndex;
    };
    TileService.$name = 'tileService';
    TileService.$inject = [
        'sideLengthService'
    ];
    return TileService;
}());
exports.TileService = TileService;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var TileSizeService_1 = __webpack_require__(100);
exports.default = angular
    .module('levels.tileSize', [])
    .service(TileSizeService_1.TileSizeService.$name, TileSizeService_1.TileSizeService)
    .name;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TileSizeService = /** @class */ (function () {
    function TileSizeService($rootScope) {
        this.$rootScope = $rootScope;
        this.tileSize = 25;
    }
    TileSizeService.prototype.getTileSize = function () {
        return this.tileSize;
    };
    TileSizeService.prototype.getTileSizePx = function () {
        return this.getTileSize() + 'px';
    };
    TileSizeService.prototype.setTileSize = function (gameWidth, widthInTiles) {
        this.tileSize = gameWidth / parseInt(widthInTiles, 10);
        this.$rootScope.$broadcast('tileSizeChanged', this.tileSize);
    };
    TileSizeService.$name = 'tileSizeService';
    TileSizeService.$inject = [
        '$rootScope'
    ];
    return TileSizeService;
}());
exports.TileSizeService = TileSizeService;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var Utils_1 = __webpack_require__(102);
exports.default = angular
    .module('levels.utils', [])
    .service(Utils_1.Utils.$name, Utils_1.Utils)
    .name;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BooleanMatrix_1 = __webpack_require__(2);
var Utils = /** @class */ (function () {
    function Utils(gameSizeService, sideLengthService, tileService) {
        this.gameSizeService = gameSizeService;
        this.sideLengthService = sideLengthService;
        this.tileService = tileService;
    }
    /** Clear everything, to start a new game */
    Utils.prototype.clearAll = function () {
        var currentGameMatrix = this.getGameMatrix();
        this.tileService.eraseTiles();
        if (currentGameMatrix) {
            currentGameMatrix.clear();
        }
        this.tileService.clearTileIndex();
    };
    /* Given a number of tiles, create an empty square matrix with that number */
    Utils.prototype.createEmptyMatrix = function (numberOfTiles) {
        var sideLength = Math.sqrt(numberOfTiles);
        var finalMatrix = new BooleanMatrix_1.BooleanMatrix(sideLength, sideLength);
        this.setGameMatrix(finalMatrix);
    };
    /* Combine a lot of the other functions here to set up a new game */
    Utils.prototype.createNewGame = function (args) {
        var goalMatrix;
        if (args.layout) {
            this.setGoalMatrix(args.layout);
        }
        this.tileService.clearTileIndex();
        this.gameSizeService.calculatePlayableArea();
        this.createEmptyMatrix(args.numberOfTiles);
        /* When editing the level, we'll prepopulate the game matrix (revealed tiles) with the goal matrix,
        then get rid of the goal matrix (since we don't want to be able to win while editing) */
        switch (args.controller) {
            case 'edit':
                goalMatrix = this.getGoalMatrix();
                if (goalMatrix) {
                    this.setGameMatrix(goalMatrix);
                }
                this.setGoalMatrix();
                break;
            case 'new':
                this.setGoalMatrix();
                break;
            default:
                break;
        }
    };
    /* Convert a Matrix into an array (for ng-repeat to hit all of them) */
    Utils.prototype.flatten = function (matrix) {
        return Array.prototype.concat.apply([], matrix);
    };
    /* Return the current game matrix */
    Utils.prototype.getGameMatrix = function () {
        return this.gameMatrix;
    };
    /* Return the current goal matrix (matrix for game matrix to be compared to to determine a win) */
    Utils.prototype.getGoalMatrix = function () {
        return this.goalMatrix;
    };
    /* Display an integer size (e.g. 15) and convert it to a pleasing form (15x15) */
    Utils.prototype.prettySize = function (size) {
        return size + 'x' + size;
    };
    /* Modify the current goal matrix (loading level from layout) */
    Utils.prototype.setGoalMatrix = function (layout) {
        if (layout) {
            this.goalMatrix = new BooleanMatrix_1.BooleanMatrix(layout.length, layout.length);
            this.goalMatrix.initializeWith(layout);
        }
        else {
            this.goalMatrix = null;
        }
    };
    /* Modify the current game matrix, setting a new side length and game size as a side effect  (used for changing size) */
    Utils.prototype.setGameMatrix = function (gameMatrix) {
        this.gameMatrix = gameMatrix;
        this.sideLengthService.sideLength = gameMatrix.length;
        this.gameSizeService.setGameSize(gameMatrix.length);
    };
    Utils.$name = 'Utils';
    Utils.$inject = [
        'gameSizeService',
        'sideLengthService',
        'tileService'
    ];
    return Utils;
}());
exports.Utils = Utils;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var LevelsRoutes = /** @class */ (function () {
    function LevelsRoutes() {
    }
    LevelsRoutes.route = function ($stateProvider) {
        var levelTemplateUrl = 'modules/levels/level/index.html';
        $stateProvider
            .state('create-level', {
            url: '/level/new',
            templateUrl: levelTemplateUrl,
            params: {
                mode: 'new'
            }
        })
            .state('level', {
            url: '/level/:levelId',
            templateUrl: levelTemplateUrl,
            params: {
                mode: 'view'
            }
        })
            .state('update-level', {
            url: '/level/:levelId/edit',
            templateUrl: levelTemplateUrl,
            params: {
                mode: 'edit'
            }
        });
    };
    return LevelsRoutes;
}());
exports.LevelsRoutes = LevelsRoutes;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var AuthenticationModule_1 = __webpack_require__(105);
var EditProfileModule_1 = __webpack_require__(107);
var ForgotPasswordModule_1 = __webpack_require__(110);
var ResetPasswordModule_1 = __webpack_require__(113);
var SignInModule_1 = __webpack_require__(116);
var SignUpModule_1 = __webpack_require__(119);
var UsersServiceModule_1 = __webpack_require__(122);
var ErrorHandler_1 = __webpack_require__(124);
var RouteModule_1 = __webpack_require__(125);
exports.default = angular
    .module('users', [
    AuthenticationModule_1.default,
    EditProfileModule_1.default,
    ForgotPasswordModule_1.default,
    ResetPasswordModule_1.default,
    SignInModule_1.default,
    SignUpModule_1.default,
    UsersServiceModule_1.default
])
    .config(ErrorHandler_1.errorHandler)
    .config(RouteModule_1.routing)
    .name;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var AuthenticationService_1 = __webpack_require__(106);
exports.default = angular
    .module('users.authentication', [])
    .service(AuthenticationService_1.AuthenticationService.$name, AuthenticationService_1.AuthenticationService)
    .name;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This should handle all interaction with the user information available to the client
 */
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService($log, $window) {
        this.$log = $log;
        this.$window = $window;
        this.signIn(this.$window.user);
    }
    Object.defineProperty(AuthenticationService.prototype, "user", {
        /** Accessed directly from the templates for user info */
        get: function () {
            return this._user;
        },
        enumerable: true,
        configurable: true
    });
    /** Set the user object */
    AuthenticationService.prototype.signIn = function (user) {
        this._user = user;
    };
    /** Signing in a null user is the same thing as signing out.*/
    AuthenticationService.prototype.signOut = function () {
        this.signIn(null);
    };
    AuthenticationService.$name = 'Authentication';
    AuthenticationService.$inject = [
        '$log',
        '$window'
    ];
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var EditProfileComponent_1 = __webpack_require__(108);
var EditProfileController_1 = __webpack_require__(109);
exports.default = angular
    .module('users.editProfile', [])
    .component(EditProfileComponent_1.EditProfileComponent.$name, new EditProfileComponent_1.EditProfileComponent())
    .controller(EditProfileController_1.EditProfileController.$name, EditProfileController_1.EditProfileController)
    .name;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Popup to change email/password or log out */
var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent() {
        this.controller = 'EditProfileController';
        this.controllerAs = 'editProfileCtrl';
        this.templateUrl = 'modules/users/editProfile/EditProfileView.html';
        this.bindings = {
            closeAction: '&'
        };
    }
    EditProfileComponent.$name = 'editProfile';
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EditProfileController = /** @class */ (function () {
    function EditProfileController($scope, $http, $location, $timeout, Users, Authentication) {
        this.$scope = $scope;
        this.$http = $http;
        this.$location = $location;
        this.$timeout = $timeout;
        this.Users = Users;
        this.Authentication = Authentication;
        this.minPasswordLength = 10;
        this.timeout = 1000;
        this.passwordDetails = {};
        this.success = {};
        this.error = {};
    }
    EditProfileController.prototype.$onInit = function () { };
    /** Change user password */
    EditProfileController.prototype.changeUserPassword = function () {
        var _this = this;
        this.success.password = this.error.password = null;
        this.$http.post('/users/password', this.passwordDetails).then(function (response) {
            // If successful show success message and clear form
            _this.success.password = true;
            _this.passwordDetails = null;
            _this.$timeout(function () {
                _this.success.password = null;
            }, _this.timeout);
        }).catch(function (response) {
            _this.error.password = response.message;
            _this.$timeout(function () {
                this.error.password = null;
            }, _this.timeout);
        });
    };
    ;
    EditProfileController.prototype.signout = function () {
        var _this = this;
        this.$http.post('/auth/signout', {}).then(function (response) {
            _this.Authentication.signOut();
            _this.closeAction();
        }).catch(function (response) {
        });
    };
    /** Update a user profile */
    EditProfileController.prototype.updateUserProfile = function (isValid) {
        var _this = this;
        if (isValid) {
            this.success.username = this.error.username = null;
            var user = new this.Users(this.Authentication.user);
            user.$update(function (response) {
                _this.success.username = true;
                _this.Authentication.signIn(response);
                _this.$timeout(function () {
                    _this.success.username = false;
                }, _this.timeout);
            }, function (response) {
                _this.error.username = response.data.message;
                _this.$timeout(function () {
                    this.error.password = null;
                }, _this.timeout);
            });
        }
        else {
            this.submitted = true;
        }
    };
    ;
    EditProfileController.$controllerAs = 'editProfileCtrl';
    EditProfileController.$name = 'EditProfileController';
    EditProfileController.$inject = [
        '$scope',
        '$http',
        '$location',
        '$timeout',
        'Users',
        'Authentication'
    ];
    return EditProfileController;
}());
exports.EditProfileController = EditProfileController;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ForgotPasswordComponent_1 = __webpack_require__(111);
var ForgotPasswordController_1 = __webpack_require__(112);
exports.default = angular
    .module('users.forgotPassword', [])
    .component(ForgotPasswordComponent_1.ForgotPasswordComponent.$name, new ForgotPasswordComponent_1.ForgotPasswordComponent())
    .controller(ForgotPasswordController_1.ForgotPasswordController.$name, ForgotPasswordController_1.ForgotPasswordController)
    .name;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Popup to change email/password or log out */
var ForgotPasswordComponent = /** @class */ (function () {
    function ForgotPasswordComponent() {
        this.controller = 'ForgotPasswordController';
        this.controllerAs = 'forgotPasswordCtrl';
        this.templateUrl = 'modules/users/forgotPassword/ForgotPasswordView.html';
        this.bindings = {
            closeAction: '&',
            username: '@'
        };
    }
    ForgotPasswordComponent.$name = 'forgotPassword';
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ForgotPasswordController = /** @class */ (function () {
    function ForgotPasswordController($http, $stateParams, $timeout) {
        this.$http = $http;
        this.$stateParams = $stateParams;
        this.$timeout = $timeout;
        this.credentials = {};
        this.timeout = 1000;
    }
    ForgotPasswordController.prototype.$onInit = function () {
        this.invalid = this.$stateParams['invalid'];
        this.credentials.username = this.username;
    };
    ForgotPasswordController.prototype.clearForm = function () {
        this.credentials = null;
    };
    // Submit forgotten password account id
    ForgotPasswordController.prototype.askForPasswordReset = function () {
        var _this = this;
        this.success = this.error = null;
        this.$http.post('/auth/forgot', this.credentials).then(function (response) {
            // Show user success message and clear form
            _this.clearForm();
            _this.success = response.data.message;
            _this.$timeout(function () {
                _this.closeAction();
            }, _this.timeout);
        }).catch(function (response) {
            // Show user error message and clear form
            _this.clearForm();
            _this.error = response.data.message;
            _this.$timeout(function () {
                _this.error = null;
            }, _this.timeout);
        });
    };
    ;
    ForgotPasswordController.$controllerAs = 'forgotPasswordCtrl';
    ForgotPasswordController.$name = 'ForgotPasswordController';
    ForgotPasswordController.$inject = [
        '$http',
        '$stateParams',
        '$timeout'
    ];
    return ForgotPasswordController;
}());
exports.ForgotPasswordController = ForgotPasswordController;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var ResetPasswordComponent_1 = __webpack_require__(114);
var ResetPasswordController_1 = __webpack_require__(115);
exports.default = angular
    .module('users.resetPassword', [])
    .component(ResetPasswordComponent_1.ResetPasswordComponent.$name, new ResetPasswordComponent_1.ResetPasswordComponent())
    .controller(ResetPasswordController_1.ResetPasswordController.$name, ResetPasswordController_1.ResetPasswordController)
    .name;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Screen to reset password */
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent() {
        this.controller = 'ResetPasswordController';
        this.controllerAs = 'resetPasswordCtrl';
        this.templateUrl = 'modules/users/resetPassword/ResetPasswordView.html';
    }
    ResetPasswordComponent.$name = 'resetPassword';
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ResetPasswordController = /** @class */ (function () {
    function ResetPasswordController($http, $location, $stateParams, Authentication) {
        this.$http = $http;
        this.$location = $location;
        this.$stateParams = $stateParams;
        this.Authentication = Authentication;
    }
    ResetPasswordController.prototype.$onInit = function () {
    };
    // Change user password
    ResetPasswordController.prototype.resetUserPassword = function () {
        var _this = this;
        this.success = this.error = null;
        this.$http.post('/auth/reset/' + this.$stateParams.token, this.passwordDetails).then(function (response) {
            // If successful show success message and clear form
            _this.passwordDetails = null;
            // Attach user profile
            _this.Authentication.signIn(response.data);
            // And redirect to the home page
            _this.$location.path('/');
        }).catch(function (response) {
            _this.error = response.data.message;
        });
    };
    ;
    ResetPasswordController.$controllerAs = 'resetPasswordCtrl';
    ResetPasswordController.$name = 'ResetPasswordController';
    ResetPasswordController.$inject = [
        '$http',
        '$location',
        '$stateParams',
        'Authentication'
    ];
    return ResetPasswordController;
}());
exports.ResetPasswordController = ResetPasswordController;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var SignInComponent_1 = __webpack_require__(117);
var SignInController_1 = __webpack_require__(118);
exports.default = angular
    .module('users.signIn', [])
    .component(SignInComponent_1.SignInComponent.$name, new SignInComponent_1.SignInComponent())
    .controller(SignInController_1.SignInController.$name, SignInController_1.SignInController)
    .name;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Sign-in popup */
var SignInComponent = /** @class */ (function () {
    function SignInComponent() {
        this.bindToController = true;
        this.controller = 'SignInController';
        this.controllerAs = 'signInCtrl';
        this.templateUrl = 'modules/users/signIn/SignInView.html';
        this.bindings = {
            closeAction: '&'
        };
    }
    SignInComponent.$name = 'signIn';
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SignInController = /** @class */ (function () {
    function SignInController($http, $scope, $timeout, Authentication, componentDialogService) {
        this.$http = $http;
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.Authentication = Authentication;
        this.componentDialogService = componentDialogService;
        this.timeout = 1000;
    }
    SignInController.prototype.$onInit = function () { };
    SignInController.prototype.openForgotPassword = function () {
        this.closeAction();
        this.componentDialogService.open('forgot-password', { username: this.credentials.username });
    };
    SignInController.prototype.signin = function () {
        var _this = this;
        this.$http.post('/auth/signin', this.credentials).then(function (response) {
            // If successful we assign the response to the global user model
            _this.Authentication.signIn(response.data);
            _this.closeAction();
        }).catch(function (response) {
            _this.error = response.data.message;
            _this.$timeout(function () {
                _this.error = null;
            }, _this.timeout);
        });
    };
    SignInController.$controllerAs = 'signInCtrl';
    SignInController.$name = 'SignInController';
    SignInController.$inject = [
        '$http',
        '$scope',
        '$timeout',
        'Authentication',
        'componentDialogService'
    ];
    return SignInController;
}());
exports.SignInController = SignInController;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var SignUpComponent_1 = __webpack_require__(120);
var SignUpController_1 = __webpack_require__(121);
exports.default = angular
    .module('users.signUp', [])
    .component(SignUpComponent_1.SignUpComponent.$name, new SignUpComponent_1.SignUpComponent())
    .controller(SignUpController_1.SignUpController.$name, SignUpController_1.SignUpController)
    .name;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Sign-in popup */
var SignUpComponent = /** @class */ (function () {
    function SignUpComponent() {
        this.bindToController = true;
        this.controller = 'SignUpController';
        this.controllerAs = 'signUpCtrl';
        this.templateUrl = 'modules/users/signUp/SignUpView.html';
        this.bindings = {
            closeAction: '&'
        };
    }
    SignUpComponent.$name = 'signUp';
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SignUpController = /** @class */ (function () {
    function SignUpController($http, $timeout, Authentication) {
        this.$http = $http;
        this.$timeout = $timeout;
        this.Authentication = Authentication;
        this.minPasswordLength = 10;
        this.timeout = 1000;
    }
    SignUpController.prototype.$onInit = function () { };
    SignUpController.prototype.signup = function () {
        var _this = this;
        this.$http.post('/auth/signup', this.credentials).then(function (response) {
            // If successful we assign the response to the global user model
            _this.Authentication.signIn(response.data);
            _this.closeAction();
        }).catch(function (response) {
            _this.error = response.data.message;
            _this.$timeout(function () {
                _this.error = null;
            }, _this.timeout);
        });
    };
    ;
    SignUpController.$controllerAs = 'signUpCtrl';
    SignUpController.$name = 'SignUpController';
    SignUpController.$inject = [
        '$http',
        '$timeout',
        'Authentication'
    ];
    return SignUpController;
}());
exports.SignUpController = SignUpController;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var UsersService_1 = __webpack_require__(123);
exports.default = angular
    .module('users.usersService', [])
    .factory('Users', UsersService_1.usersService)
    .name;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Users service used for communicating with the users REST endpoint
function usersService($resource) {
    return $resource('users', {}, {
        update: {
            method: 'PUT'
        }
    });
}
exports.usersService = usersService;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Config HTTP Error Handling
function errorHandler($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
        function ($q, $location, Authentication) {
            return {
                responseError: function (rejection) {
                    switch (rejection.status) {
                        case 401:
                            // Deauthenticate the global user
                            Authentication.signOut();
                            // Redirect to signin page
                            $location.path('signin');
                            break;
                        case 403:
                            // Add unauthorized behaviour 
                            break;
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ]);
}
exports.errorHandler = errorHandler;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Setting up route
function routing($stateProvider) {
    // Users state routing
    $stateProvider.
        state('reset-invalid', {
        url: '/password/reset/invalid',
        params: {
            invalid: true
        },
        plain: true,
        template: '<forgot-password></forgot-password>'
    }).
        state('reset', {
        url: '/password/reset/:token',
        template: '<reset-password></reset-password>'
    });
}
exports.routing = routing;


/***/ })
],[22]);
//# sourceMappingURL=krossr.bundle-864bc2a6711784b5bb41.js.map