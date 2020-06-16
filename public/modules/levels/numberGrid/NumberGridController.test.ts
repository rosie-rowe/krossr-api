import * as angular from 'angular';
import { ApplicationConfiguration } from '../../config';

export class NumberGridControllerTests {
    static run() {
        // Number line Controller Spec
        describe('Number grid Controller Tests', function() {
            // Initialize global variables
            var NumberGridController,
                scope,
                $httpBackend,
                $stateParams,
                $location;
    
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
    
                // Initialize the Number line controller.
                NumberGridController = $controller('NumberGridController', {
                    $scope: scope
                });
            }));
        });
    }
}