// setup
var tower_left = {color: "gray", pixels: []}
var tower_center = {color: "gray", pixels: []};
var tower_right = {color: "gray", pixels: []};


var ring_1 = {color: "#210B61", size: 9}
var ring_2 = {color: "#04B431", size: 7}
var ring_3 = {color: "#FF0040", size: 5}
var ring_4 = {color: "#FF8000", size: 3}

var towers = [tower_left, tower_center, tower_right];
var towerIndex = 0;
var chosenTower = towers[towerIndex];
var chosenRing = null;
var score = 0;

var setupGame = function() {
  tower_left.rings = [ring_1, ring_2, ring_3, ring_4];
  tower_center.rings = [];
  tower_right.rings = [];
  score = 0;
  towerIndex = 0;
  chosenTower = towers[towerIndex];  
  setupRingPixels();
  buildTowerPixels(tower_left, 5);
  buildTowerPixels(tower_center, 14);
  buildTowerPixels(tower_right, 23);
}

var setupRingPixels = function() {
  ring_1.pixels = [{top: 14, left: 1}, {top: 14, left: 2}, {top: 14, left: 3}, {top: 14, left: 4}, {top: 14, left: 5}, {top: 14, left: 6},{top: 14, left: 7}, {top: 14, left: 8}, {top: 14, left: 9},
                      {top: 13, left: 1}, {top: 13, left: 2}, {top: 13, left: 3}, {top: 13, left: 4}, {top: 13, left: 5}, {top: 13, left: 6},{top: 13, left: 7}, {top: 13, left: 8}, {top: 13, left: 9}]
  ring_2.pixels = [{top: 12, left: 2}, {top: 12, left: 3}, {top: 12, left: 4}, {top: 12, left: 5}, {top: 12, left: 6},{top: 12, left: 7}, {top: 12, left: 8},
                      {top: 11, left: 2}, {top: 11, left: 3}, {top: 11, left: 4}, {top: 11, left: 5}, {top: 11, left: 6},{top: 11, left: 7}, {top: 11, left: 8}]
              
  ring_3.pixels = [{top: 10, left: 3}, {top: 10, left: 4}, {top: 10, left: 5}, {top: 10, left: 6},{top: 10, left: 7},
                      {top: 9, left: 3}, {top: 9, left: 4}, {top: 9, left: 5}, {top: 9, left: 6},{top: 9, left: 7}]
  ring_4.pixels = [{top: 8, left: 4}, {top: 8, left: 5}, {top: 8, left: 6},
                      {top: 7, left: 4}, {top: 7, left: 5}, {top: 7, left: 6}]          
}

var buildTowerPixels = function(tower, left_alignment) {
  for (var i = 14; i > 4; i--) {
    tower.pixels.push({top: i, left: left_alignment});
  }
}


var draw = function() {
  var drawableObjects = [tower_left, tower_center, tower_right, ring_1, ring_2, ring_3, ring_4];
  CHUNK.draw(drawableObjects);
}

var makeMove = function(direction) {
  if( direction === "up" ) {
    removeRing();
  } else if( direction === "down" ) {
    if( chosenTower.rings.length === 0 || chosenRing.size < chosenTower.rings[chosenTower.rings.length - 1].size ) {
      placeRing();
      updateScore();
    } else {

      alert("Ring cannot be placed above a smaller one");
    };

  } else if( direction === "left" || direction === "right") {
    changeTower(direction);
  };
  draw();  

  if(direction === "down") {
    checkForWin();
  }
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
  chosenRing = null;
}

var changeTower = function(direction) {

  if( direction === "left" && towerIndex > 0 ) {
    towerIndex = towerIndex - 1
    chosenTower = towers[towerIndex];
    
  } else if( direction === "right" && towerIndex < 2 ) {
    towerIndex = towerIndex + 1
    chosenTower = towers[towerIndex];
  };

  if(chosenRing !== null) {
    moveRing(chosenRing, direction);
  }

}

var moveRing = function(ring, direction, times = 1) {
  if(direction === "left") {
     ring.pixels.forEach( function(pixel) {
        pixel.left = pixel.left - 9 * times;
      });
   } else if(direction === "right") {
    ring.pixels.forEach( function(pixel) {
        pixel.left = pixel.left + 9;
      });
   };
}
var updateScore = function() {
  score = score + 1;
  document.getElementById("score").innerHTML = score;
}

var checkForWin = function() {
  if(tower_right.rings.length === 4) {
    var response = confirm("Congrats, you win! It took you " + score + " moves. Play again?");

    if(response === true) {
      setupGame();
      draw();
    };
  };
}


setupGame();
draw();
CHUNK.onArrowKey(makeMove);

