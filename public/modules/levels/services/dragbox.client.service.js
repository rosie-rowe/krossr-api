'use strict';

angular.module('levels').factory('dragBoxService', ['coordinateService',
    function(coordinateService) {
        function DragBox() {
            this.initState = true;
            this.startCoord; //coordinateService.newCoord();
            this.endCoord; // = coordinateService.newCoord();

            /*
            * Given a dragbox, return an array of all of the coordinates of included tiles
            */
            this.process = function() {
                if (!this.isValid()) {
                    return [];
                }

                var startX = this.startCoord.x;
                var startY = this.startCoord.y;
                var endX = this.endCoord.x;
                var endY = this.endCoord.y;
                var finalCoords = [];

                //todo: make this a function. tricky javascript makes easy problem harder.
                if (startX > endX) {
                    var temp = startX;
                    startX = endX;
                    endX = temp;
                }

                if (startY > endY) {
                    var temp = startY;
                    startY = endY;
                    endY = temp;
                }

                for (var i = startY; i <= endY; i++) {
                    for (var j = startX; j <= endX; j++) {
                        var coord = {
                            x: j,
                            y: i
                        };

                        finalCoords.push(coord);
                    }
                }

                return finalCoords;
            };

            this.isStarted = function() {
                return this.startCoord;
            };

            this.isValid = function() {
                return this.startCoord && this.endCoord;
            };
        }

        var dragBox;

        // Public API
        return {
            clearDragBox: function() { dragBox = new DragBox() },
            getInitState: function () {
                return dragBox.initState;
            },
            process: function() {
                return dragBox.process();
            },
            setStartCoord: function(coord) {
                dragBox.startCoord = coord;
                return dragBox;
            },
            setEndCoord: function(coord) {
                dragBox.endCoord = coord;
                return dragBox;
            },
            setInitState: function(initState) {
                dragBox.initState = initState;
                return dragBox;
            },
            validate: function() {
                return dragBox.isValid();
            },
            validateStart: function() {
                return dragBox.isStarted();
            }
        };
    }
]);