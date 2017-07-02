import { ApplicationConfiguration } from '../../../config';

'use strict';

class LevelSelectControllerTests {
    static run() {
        describe('LevelSelectController tests:', function() {
            // Initialize global variables
            var LevelSelectController,
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
            
                // Initialize the LevelSelect controller.
                LevelSelectController = $controller('LevelSelectController', {
                    $scope: scope
                });
            }));
            
            it('find() should create an array with at least one Level object fetched from XHR', inject(function(Levels) {
                // Create sample Level using the Levels service
                var sampleLevel = new Levels({
                    id: '525a8422f6d0f87f0e407a33',
                    name: 'New Level',
                    lives: 5,
                    layout: [[true, true, true, true, true],
                                [true, true, true, true, true],
                                [true, true, true, true, true],
                                [true, true, true, true, true],
                                [true, true, true, true, true]],
                    ratings: [],
                    prettySize: '5x5',
                });
            
                var sampleLevelsResponse = {
                    numPerPage: 8,
                    count: 10,
                    levels: [sampleLevel]
                }
            
                // Create a sample Levels array that includes the new Level
                var sampleLevels = [sampleLevel];
            
                // Set GET response
                $httpBackend.expectGET('levels?pageNum=0&sizeRestriction=&sortDirection=').respond(sampleLevelsResponse);
            
                // Run controller functionality
                LevelSelectController.find();
                $httpBackend.flush();
            
                // Test scope value
                expect(scope.levels).toEqual(sampleLevels);
            }));
        });
    }
}

LevelSelectControllerTests.run();