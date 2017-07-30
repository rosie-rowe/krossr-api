import * as angular from 'angular';
import 'angular-mocks';

import { ApplicationConfiguration } from '../public/modules/config';

import { GameControllerTests } from '../public/modules/levels/game/GameController.test';

'use strict';

class TestModule {
    static run() {
        describe('Krossr tests', function() {

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

            GameControllerTests.run();
        })
    }
}

TestModule.run();