// setup
var tower_left = {color: "gray", 
  pixels: [{top: 14, left: 5},
          {top: 13, left: 5}, 
          {top: 12, left: 5}, 
          {top: 11, left: 5}, 
          {top: 10, left: 5},
          {top: 9, left: 5},
          {top: 8, left: 5},
          {top: 7, left: 5},
          {top: 6, left: 5},
          {top: 5, left: 5}]};
var tower_center = {color: "gray", 
  pixels: [{top: 14, left: 14},
          {top: 13, left: 14},
          {top: 12, left: 14},
          {top: 11, left: 14},
          {top: 10, left: 14},
          {top: 9, left: 14},
          {top: 8, left: 14},
          {top: 7, left: 14},
          {top: 6, left: 14},
          {top: 5, left: 14}]};
var tower_right = {color: "gray", 
  pixels: [{top: 14, left: 23},
          {top: 13, left: 23},
          {top: 12, left: 23},
          {top: 11, left: 23},
          {top: 10, left: 23},
          {top: 9, left: 23},
          {top: 8, left: 23},
          {top: 7, left: 23},
          {top: 6, left: 23},
          {top: 5, left: 23}]};

var ring_1 = {color: "#210B61", 
  pixels: [{top: 14, left: 1}, {top: 14, left: 2}, {top: 14, left: 3}, {top: 14, left: 4}, {top: 14, left: 5}, {top: 14, left: 6},{top: 14, left: 7}, {top: 14, left: 8}, {top: 14, left: 9},
          {top: 13, left: 1}, {top: 13, left: 2}, {top: 13, left: 3}, {top: 13, left: 4}, {top: 13, left: 5}, {top: 13, left: 6},{top: 13, left: 7}, {top: 13, left: 8}, {top: 13, left: 9}]}

var ring_2 = {color: "#04B431", 
  pixels: [{top: 12, left: 2}, {top: 12, left: 3}, {top: 12, left: 4}, {top: 12, left: 5}, {top: 12, left: 6},{top: 12, left: 7}, {top: 12, left: 8},
          {top: 11, left: 2}, {top: 11, left: 3}, {top: 11, left: 4}, {top: 11, left: 5}, {top: 11, left: 6},{top: 11, left: 7}, {top: 11, left: 8}]}

var ring_3 = {color: "#FF0040", 
  pixels: [{top: 10, left: 3}, {top: 10, left: 4}, {top: 10, left: 5}, {top: 10, left: 6},{top: 10, left: 7},
          {top: 9, left: 3}, {top: 9, left: 4}, {top: 9, left: 5}, {top: 9, left: 6},{top: 9, left: 7}]}

var ring_4 = {color: "#FF8000", 
  pixels: [{top: 8, left: 4}, {top: 8, left: 5}, {top: 8, left: 6},
          {top: 7, left: 4}, {top: 7, left: 5}, {top: 7, left: 6}]}

tower_left.rings = [ring_1, ring_2, ring_3, ring_4];
var towers = [tower_left, tower_right, tower_center];
var chosenTower = tower_left;
var chosenRing = null;


var draw = function() {
  var drawableObjects = [tower_left, tower_center, tower_right, ring_1, ring_2, ring_3, ring_4];
  CHUNK.draw(drawableObjects);
}

var makeMove = function(direction) {
  var ring = chosenTower.rings[chosenTower.rings.length - 1];
  if( direction === "up" ) {
    removeRing();
  } else if( direction === "down" ) {
    placeRing();
  } else if( direction === "left" || direction === "right") {
    //changeTower(ring, direction);
  };
  
  draw();  
}


var removeRing = function() {
  chosenRing = chosenTower.rings.pop();

  var upperTop = chosenRing.pixels[0].top

  chosenRing.pixels.forEach( function(coordinate) {
    if(coordinate.top === upperTop) {
      coordinate.top = 2
    } else {
      coordinate.top = 3
    };
  });
}

var placeRing = function() {
  chosenTower.rings.push(chosenRing);
  var upperTop = chosenRing.pixels[0].top
  var towerSize = chosenTower.rings.length;
  chosenRing.pixels.forEach( function(coordinate) {
    if( coordinate.top === upperTop ) {
      coordinate.top = 13 - ((towerSize-1)  * 2)
    } else {
      coordinate.top = 14 - ((towerSize-1) * 2)
    };
  });
}

var changeTower = function(ring, direction) {

}


CHUNK.onArrowKey(makeMove);
draw();

