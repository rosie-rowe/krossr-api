/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../typings/point.d.ts" />

'use strict';

class DragBox {
    public initState: boolean = true;
    public startCoord: Point;
    public endCoord: Point;

    contructor() {}
    /*
    * Given a dragbox, return an array of all of the coordinates of included tiles
    */
    public process() {
        if (!this.isValid()) {
            return [];
        }

        var startX = this.startCoord.x;
        var startY = this.startCoord.y;
        var endX = this.endCoord.x;
        var endY = this.endCoord.y;
        var finalCoords: Point[] = [];

        //todo: make this a function. tricky javascript makes easy problem harder.
        if (startX > endX) {
            [endX, startX] = [startX, endX];
        }

        if (startY > endY) {
            [endY, startY] = [startY, endY];
        }

        for (var i = startY; i <= endY; i++) {
            for (var j = startX; j <= endX; j++) {
                var coord: Point = {
                    x: j,
                    y: i
                };

                finalCoords.push(coord);
            }
        }

        return finalCoords;
    }

    public isStarted() {
        return this.startCoord;
    }

    public isValid() {
        return this.startCoord && this.endCoord;
    }
}

angular.module('levels').factory('dragBoxService', [
    function() {
        var dragBox: DragBox = new DragBox();

        // Public API
        return {
            clearDragBox: function() { dragBox = new DragBox() },
            getInitState() { return dragBox.initState; },
            process() { return dragBox.process(); },
            setStartCoord(coord: Point) {
                dragBox.startCoord = coord;
                return dragBox;
            },
            setEndCoord(coord: Point) {
                dragBox.endCoord = coord;
                return dragBox;
            },
            setInitState: function(initState: boolean) {
                dragBox.initState = initState;
                return dragBox;
            },
            validate() {
                return dragBox.isValid();
            },
            validateStart() {
                return dragBox.isStarted();
            }
        };
    }
]);