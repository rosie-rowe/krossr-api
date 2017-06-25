'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', '$timeout', 'Authentication',
    function($scope, $http, $location, $timeout, Authentication) {
        var timeout = 1000;

        $scope.authentication = Authentication;
        $scope.minPasswordLength = 10;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) $location.path('/levels');

        this.signup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;

                // Typeof check makes tests happy
                if (typeof $scope.closeThisDialog === 'function') {
                    $scope.closeThisDialog();
                }
            }).error(function(response) {
                $scope.error = response.message;

                $timeout(function() {
                    $scope.error = null;
                }, timeout);
            });
        };
    }
]);