import * as angular from 'angular';
import { ApplicationConfiguration } from '../../config';

export class NumberLineControllerTests {
    static run() {
        // Number grid Controller Spec
        describe('Number line Controller Tests', function() {
            // Initialize global variables
            var NumberLineController,
                scope,
                $httpBackend,
                $stateParams,
                $location;
    
            // Then we can start by loading the main application module
            beforeEach(angular.mock.module(ApplicationConfiguration.applicationModuleName));
    
            // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
            // This allows us to inject a service but then attach it to a variable
            // with the same name as the service.
            beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
                // Set a new global scope
                scope = $rootScope.$new();
    
                // Point global variables to injected services
                $stateParams = _$stateParams_;
                $httpBackend = _$httpBackend_;
                $location = _$location_;
    
                // Initialize the Number grid controller.
                NumberLineController = $controller('NumberLineController', {
                    $scope: scope
                });
            }));
    
            it('Should do some controller test', inject(function() {
                // The test logic
                // ...
            }));
        });
    }
}