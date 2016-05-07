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
                if (!(this.startCoord && this.endCoord)) {
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
        }

        // Public API
        return {
            //clearDragBox: function() { dragBox = this.newDragBox(); },
            newDragBox: function() { return new DragBox(); },
            //getDragBox: function() { return dragBox; },
            //setDragBox: function(box) { dragBox = box; }
        };
    }
]);