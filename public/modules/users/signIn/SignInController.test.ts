import * as angular from 'angular';
import { ApplicationConfiguration } from '../../config';

export class SignInControllerTests {
    static run() {
        // Authentication controller Spec
        describe('SignInController', function() {
            // Initialize global variables
            var SignInController,
                scope,
                $httpBackend,
                $stateParams,
                $location;
    
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
                SignInController = $controller('SignInController', {
                    $scope: scope
                });
                
                // Fake the closeAction function since it is passed in via an outside scope
                SignInController.closeAction = () => {};
            }));
    
    
            it('$scope.signin() should login with a correct user and password', function() {
                // Test expected GET request
                $httpBackend.when('POST', '/auth/signin').respond(200, 'Fred');
    
                SignInController.signin();
                $httpBackend.flush();
    
                // Test scope value
                expect(SignInController.Authentication.user).toEqual('Fred');
            });
    
            it('$scope.signin() should fail to log in with nothing', function() {
                // Test expected POST request
                $httpBackend.expectPOST('/auth/signin').respond(400, {
                    'message': 'Missing credentials'
                });
    
                SignInController.signin();
                $httpBackend.flush();
    
                // Test scope value
                expect(SignInController.error).toEqual('Missing credentials');
            });
    
            it('$scope.signin() should fail to log in with wrong credentials', function() {
                // Foo/Bar combo assumed to not exist
                SignInController.Authentication.signIn('Foo');
                SignInController.credentials = 'Bar';
    
                // Test expected POST request
                $httpBackend.expectPOST('/auth/signin').respond(400, {
                    'message': 'Unknown user'
                });
    
                SignInController.signin();
                $httpBackend.flush();
    
                // Test scope value
                expect(SignInController.error).toEqual('Unknown user');
            });
        });
    }
}