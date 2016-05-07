'use strict';

angular.module('levels').factory('coordinateService', [
    function() {
        function Coordinate() {
            this.x = null;
            this.y = null;
        }

        // Public API
        return {
            newCoord: function() {
                return new Coordinate();
            }
        };
    }
]);