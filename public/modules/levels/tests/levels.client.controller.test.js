'use strict';

(function() {
	// Levels Controller Spec
	describe('Levels Controller Tests', function() {
		// Initialize global variables
		var LevelsController,
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
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

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
			LevelsController = $controller('LevelsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Level object fetched from XHR', inject(function(Levels) {
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
				Ratings: [],
				prettySize: '5x5',
				averageRating: 0
			});

			var sampleLevelsResponse = {
				numPerPage: 8,
				count: 10,
				levels: [sampleLevel]
			}

			// Create a sample Levels array that includes the new Level
			var sampleLevels = [sampleLevel];

			// Set GET response
			$httpBackend.expectGET('levels?pageNum=0&sizeRestriction=').respond(sampleLevelsResponse);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.levels).toEqualData(sampleLevels);
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
			scope.selectedLevelId = '525a8422f6d0f87f0e407a33';
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.level).toEqualData(sampleLevel);
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
			scope.create(sampleLevelPostData);
			$httpBackend.flush();
		}));

		it('$scope.update() should update a valid Level', inject(function(Levels) {
			// Define a sample Level put data
			var sampleLevelPutData = new Levels({
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
			scope.update();
			$httpBackend.flush();
		}));

		it('$scope.remove() should send a DELETE request with a valid levelId and remove the Level from the scope', inject(function(Levels) {
			// Create new Level object
			var sampleLevel = new Levels({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Levels array and include the Level
			scope.levels = [sampleLevel];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/levels\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleLevel);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.levels.length).toBe(0);
		}));
	});
}());