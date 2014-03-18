var draw = function(snakeToDraw, apple, snakeColor) {
  var drawableSnake = {color: snakeColor, pixels: snakeToDraw};
  var drawableApple = {color: "red", pixels: [apple]};
  var drawableObjects = [drawableSnake, drawableApple];
  CHUNK.draw(drawableObjects);
}

var moveSegment = function(segment) {

  switch(segment.direction) {
    case "down":
      return {top: segment.top + 1, left: segment.left}
    case "up":
      return {top: segment.top - 1, left: segment.left}
    case "right":
      return {top: segment.top, left: segment.left + 1}
    case "left":
      return {top: segment.top, left: segment.left - 1}
    default:
      return segment;
  }
}

var segmentFartherFowardThan = function(snake, index) { 
  return snake[index - 1] || snake[index]
}


var moveSnake = function(snake) {
  return snake.map(function(oldSegment, segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFartherFowardThan(snake, segmentIndex).direction;
    return newSegment;
  });
}

var changeDirection = function(direction) {
  snake[0].direction = direction;
}

var growSnake = function(snake) {
  var lastSegment = snake[snake.length - 1];
  snake.push({top: lastSegment.top, left: lastSegment.left});
  return snake;
}

var ate = function(snake, thing) {
  var head = snake[0];
  return CHUNK.detectCollisionBetween([head], thing);
}

var advanceGame = function() {
  newSnake = moveSnake(snake);

  var snakeColor = "green";

  if (ate(newSnake, [apple])) {
    growSnake(newSnake);
    apple = CHUNK.randomLocation();
    snakeColor = "yellow";
    updateScore();
  }

  if (ate(newSnake, snake)) {
    CHUNK.endGame();

    var response = confirm("Game Over! Snake ran into itself. Play Again?");

    if(response === true) {
      resetGame();
    };
  } else if (ate(newSnake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();

    var response = confirm("Game Over! You hit a wall. Play again?");

    if(response === true) {
      resetGame();
    };
  } else {
    snake = newSnake;
    draw(newSnake, apple, snakeColor);
  } 
}

var updateScore = function() {
  score = score + 1;
  document.getElementById("score").innerHTML= score;
}
 
var resetGame = function() {
  snake = [{top: 0, left: 1, direction: "right"}, {top: 0, left: 0, direction: "right"}];
  apple = CHUNK.randomLocation();
  score = 2;
  CHUNK.executeNTimesPerSecond(advanceGame, 3);
}


// Start of Game
var snake = [{top: 0, left: 1, direction: "right"}, {top: 0, left: 0, direction: "right"}];
var apple = CHUNK.randomLocation();
var score = 2;

CHUNK.onArrowKey(changeDirection);
CHUNK.executeNTimesPerSecond(advanceGame, 3);
