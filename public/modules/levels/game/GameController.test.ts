import * as angular from 'angular';
import { ApplicationConfiguration } from '../../config';

export class GameControllerTests {
    static run() {
        // Game Controller Spec
        describe('Game Controller Tests', function() {
            // Initialize global variables
            var GameController,
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
    
                // Initialize the Game controller.
                GameController = $controller('gameController', {
                    $scope: scope
                });
            }));
        }); 
    }
}