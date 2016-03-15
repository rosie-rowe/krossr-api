'use strict';

var tileController = function($scope, Utils, shiftService) {
    var _this = this,
        sideLength = Utils.getSideLength(),
        goalMatrix = Utils.getGoalMatrix();

    this.fill('empty');

    if ($scope.level.currentView === 'edit'
        && $scope.ctrl.finalLayout
        && $scope.ctrl.finalLayout.tiles
        && $scope.ctrl.finalLayout.tiles[$scope.$index]
        && $scope.ctrl.finalLayout.tiles[$scope.$index].selected) {
          this.fill('selected');
        } else {
          this.fill('empty');
        }

    this.change = function(index, initState, changeTo) {
        if (this.editable === 'true') {
            _this.changeTile($scope, index, initState, changeTo, goalMatrix, shiftService, Utils);
        }
    };

    this.fillBorders = function(direction, index) {
      return _this.getBorderColors(sideLength, direction, index);
    };

    this.convert1D = function(coord) {
      return Utils.convertTo1D(coord);
    };

    this.convert2D = function(index) {
      return Utils.convertTo2D(index);
    };

    this.getTileSize = Utils.getTileSize; 

    $scope.$on('tileSizeChanged', function() {
      sideLength = Utils.getSideLength();
      _this.setTileSize(Utils.getTileSize($scope.tutorialMode));
    });
};

tileController.$inject = ['$scope', 'Utils', 'shiftService'];

tileController.prototype.changeTile = function(scope, index, initState, changeTo, goalMatrix, shiftService, Utils) {
    var coord,
        wrong_answer = false;

    if (typeof index === 'number') { 
      coord = this.convert2D(index);
    } else {
      coord = index;
    }

    if (typeof changeTo === "string") {
      this.fill(changeTo);
    } else {
      if (shiftService.shiftOn === true) {
        this.fill('marked', initState);
        Utils.setCoord(coord.y, coord.x, this.selected);
      } else {
        // we don't want this to happen for new or edit screens
        if (goalMatrix) {
          wrong_answer = (goalMatrix[coord.y][coord.x] !== true)
        }

        if (wrong_answer) {
          this.fill('marked');
          Utils.removeLife(scope.level);
        } else {
          this.fill('selected', initState);
          Utils.setCoord(coord.y, coord.x, this.selected);
        }
      }
    }
};

tileController.prototype.fill = function(fillType, override) {
  switch (fillType) {
    case 'pending':
      this.pending = true;
      break;
    case 'marked':
      this.marked = checkForOverride(override, this.marked);
      this.selected = false;
      this.pending = false;
      break;
    case 'selected':
      this.selected = checkForOverride(override, this.selected);
      this.marked = false;
      this.pending = false;
      break;
    case 'empty':
      this.selected = false;
      this.marked = false;
      this.pending = false;
      break;
    default:
      console.log("you done goofed");
      break;
  }
};

/* If the override value (which will be the value of the tile that a dragstart is activated on)
   is present, use that for all tiles being considered.
   This is so you don't unselect previously selected tiles if your drags overlap
   */
var checkForOverride = function(override, value) {
  if (typeof override !== 'undefined') {
    return !override;
  } else {
    return !value;
  }
};

/* Determine which tiles to add colored borders to */
tileController.prototype.getBorderColors = function(sideLength, direction, index) {
  var canColor,
      coord = this.convert2D(index);

  // no borders through puzzle for small puzzles
  if (sideLength <= 5) {
    return;
  }

  switch (direction) {
    case 'left':
      canColor = this.testTileForBorder(sideLength, coord.x);
      break;
    case 'right':
      canColor = this.testTileForBorder(sideLength, coord.x + 1);
      break;
    case 'bottom':
      canColor = this.testTileForBorder(sideLength, coord.y + 1);
      break;
    case 'top':
      canColor = this.testTileForBorder(sideLength, coord.y);
    default:
      break;
  }
  if (canColor) {
    return "1px solid #222"
  }
};

/* We want to add colored borders to every 5th tile, unless it is at the beginning or end of a column or row */
tileController.prototype.testTileForBorder = function(sideLength, index) {
  return (index % 5 === 0
          && index % sideLength !== 0);
};

tileController.prototype.setTileSize = function(tileSize) {
  tileSize = Math.floor(tileSize);
  this.width = tileSize + 'px';
  this.height = tileSize + 'px';
};

angular
    .module('levels')
        .controller('tileController', tileController);