import * as angular from 'angular';
import { ApplicationConfiguration } from '../../config';

export class SignUpControllerTests {
    static run() {
        // SignUp controller Spec
        describe('SignUpController', function() {
            // Initialize global variables
            var SignUpController,
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
    
                // Initialize the Authentication controller
                SignUpController = $controller('SignUpController', {
                    $scope: scope
                });

                // Fake the closeAction function since it is passed in via an outside scope
                SignUpController.closeAction = () => {};
            }));
    
            it('$scope.signup() should register with correct data', function() {
                // Test expected GET request
                SignUpController.Authentication.signIn('Fred');
                $httpBackend.when('POST', '/auth/signup').respond(200, 'Fred');
    
                SignUpController.signup();
                $httpBackend.flush();
    
                // test scope value
                expect(SignUpController.Authentication.user).toBe('Fred');
                expect(SignUpController.error).toEqual(undefined);
            });
    
            it('$scope.signup() should fail to register with duplicate Username', function() {
                // Test expected POST request
                $httpBackend.when('POST', '/auth/signup').respond(400, {
                    'message': 'Username already exists'
                });
    
                SignUpController.signup();
                $httpBackend.flush();
    
                // Test scope value
                expect(SignUpController.error).toBe('Username already exists');
            });
        });
    }
}