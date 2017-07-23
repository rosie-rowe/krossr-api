import * as angular from 'angular';
import { ApplicationConfiguration } from '../../config';

'use strict'

class LevelControllerTests {
    static run() {
      	// Levels Controller Spec
        describe('LevelController Tests', function() {
            // Initialize global variables
            var LevelController,
                scope,
                $httpBackend,
                $stateParams,
                $location;
    
            // The $resource service augments the response object with methods for updating and deleting the resource.
            // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
            // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
            // When the toEqualData matcher compares two objects, it takes only object properties into
            // account and ignores methods.
            beforeEach(function() {
                jasmine.addMatchers({
                    toEqualData: function(util, customEqualityTesters) {
                        return {
                            compare: function(actual, expected) {
                                return {
                                    pass: angular.equals(actual, expected)
                                };
                            }
                        };
                    }
                });
            });
    
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
    
                // Initialize the Levels controller.
                LevelController = $controller('LevelController', {
                    $scope: scope
                });
            }));
    
            it('$scope.findOne() should create an array with one Level object fetched from XHR using a levelId URL parameter', inject(function(Levels) {
                // Define a sample Level object
                var sampleLevel = new Levels({
                    id: '525a8422f6d0f87f0e407a33',
                    name: 'New Level'
                });
    
                // Set the URL parameter
                $stateParams.levelId = '525a8422f6d0f87f0e407a33';
    
                // Set GET response
                $httpBackend.expectGET(/levels\/([0-9a-fA-F]{24})$/).respond(sampleLevel);
    
                // Run controller functionality
                LevelController.selectedLevelId = '525a8422f6d0f87f0e407a33';
            
                LevelController.findOne();
                $httpBackend.flush();
    
                expect(LevelController.level.id).toEqual(sampleLevel.id);
            }));
    
            it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Levels) {
                // Create a sample Level object
                var sampleLevelPostData = new Levels({
                    name: 'New Level',
                    lives: 5,
                    layout: [[true, true, true, true, true],
                            [true, true, true, true, true],
                            [true, true, true, true, true],
                            [true, true, true, true, true],
                            [true, true, true, true, true]]
                });
    
                // Create a sample Level response
                var sampleLevelResponse = new Levels({
                    name: 'New Level'
                });
    
                // Set POST response
                $httpBackend.expectPOST('levels', sampleLevelPostData).respond(sampleLevelResponse);
    
                // Run controller functionality
                LevelController.create(sampleLevelPostData);
                $httpBackend.flush();
            }));
    
            it('$scope.update() should update a valid Level', inject(function(Levels) {
                // Define a sample Level put data
                var sampleLevelPutData = new Levels({
                    id: '525a8422f6d0f87f0e407a33',
                    name: 'New Level',
                    layout: [[true, true, true, true, true],
                            [true, true, true, true, true],
                            [true, true, true, true, true],
                            [true, true, true, true, true],
                            [true, true, true, true, true]]
                });
    
                // Mock Level in scope
                scope.level = sampleLevelPutData;
    
                // Set PUT response
                $httpBackend.expectPUT(/levels\/([0-9a-fA-F]{24})$/).respond();
    
                // Run controller functionality
                LevelController.update();
                $httpBackend.flush();
            }));
    
            it('$scope.remove() should send a DELETE request with a valid levelId and remove the Level from the scope', inject(function(Levels) {
                // Create new Level object
                var sampleLevel = new Levels({
                    id: '525a8422f6d0f87f0e407a33'
                });
    
                // Create new Levels array and include the Level
                scope.levels = [sampleLevel];
    
                // Set expected DELETE response
                $httpBackend.expectDELETE(/levels\/([0-9a-fA-F]{24})$/).respond(204);
    
                // Run controller functionality
                LevelController.remove(sampleLevel);
                $httpBackend.flush();
    
                // Test array after successful delete
                expect(scope.levels.length).toBe(0);
            }));
        });
    } 
}

LevelControllerTests.run();