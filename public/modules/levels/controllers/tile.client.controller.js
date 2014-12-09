'use strict';

var tileController = function($rootScope, $scope) {
    var _this = this,
        sideLength = $rootScope.gameMatrix.length;

    this.fill('empty');

    this.change = function(index, initState, changeTo) {
        if (this.editable === 'true') {
            _this.changeTile($rootScope, index, initState, changeTo);
        }
        $scope.$apply();
    };
    this.getLayoutForEdit = function(layout, index) {
        _this.fillFromLayout($rootScope, layout, index);
    };
    this.checkWin = function() {
      _this.checkForWin($rootScope);
    };
    this.fillBorders = function(direction, index) {
      return _this.getBorderColors(sideLength, direction, index);
    };
    this.convert1D = function(index) {
      return _this.convertTo1D(index, sideLength);
    }
    this.convert2D = function(index) {
      return _this.convertTo2D(index, sideLength);
    }
    this.setTileSize($rootScope, 25);
    $scope.$on('clearAll', function() {
      console.log('clearing tile');
      _this.fill('empty');
    });
};

tileController.$inject = ['$rootScope', '$scope'];

tileController.prototype.changeTile = function($rootScope, index, initState, changeTo) {
    var coord;

    if (typeof index === 'number') { 
      coord = this.convertTo2D($rootScope, index);
    } else {
      coord = index;
    }

    if (typeof changeTo === "string") {
      this.fill(changeTo);
    } else {
      if ($rootScope.shiftOn === true) {
        this.fill('marked', initState);
      } else {
        this.fill('selected', initState);
        $rootScope.gameMatrix[coord.y][coord.x] = this.selected;
      }
    }
};

tileController.prototype.checkForWin = function($rootScope) {
  if (typeof $rootScope.goalMatrix !== 'undefined') {
    var result = ($rootScope.goalMatrix.toString() === $rootScope.gameMatrix.toString());
    if (result) {
      $rootScope.gameIsWon = true;
      $rootScope.$digest();
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
    return "1px solid #FFF"
  }
};

/* We want to add colored borders to every 5th tile, unless it is at the beginning or end of a column or row */
tileController.prototype.testTileForBorder = function(sideLength, index) {
  return (index % 5 === 0
          && index % sideLength !== 0);
};

tileController.prototype.fillFromLayout = function($rootScope, layout, index) {
  var coord = this.convertTo2D($rootScope, index),
      value = layout[coord.y][coord.x];

  if (value === true) {
    this.fill('selected');
  }
};

tileController.prototype.setTileSize = function($rootScope, value) {
    $rootScope.tile.width  = value;
    $rootScope.tile.height = value;

    this.width = $rootScope.tile.width + 'px';
    this.height = $rootScope.tile.height  + 'px';
};

tileController.prototype.convertTo1D = function(coord, sideLength) {
  return (coord.y * sideLength) + coord.x;
};

tileController.prototype.convertTo2D = function(index, sideLength) {
  var x = index % sideLength,
      y = (index - x) / sideLength,
      coord = {
        y: y,
        x: x
      };

  //console.log(coord);
  return coord;
}

angular
    .module('levels')
        .controller('tileController', tileController);