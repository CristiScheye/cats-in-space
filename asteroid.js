(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  function randomVelocity () {
    var dx = Math.random() * 3 - 8;
    var dy = Math.random() * 2;
    return [ dx, dy ];
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel) {
    COLOR = 'white';
    RADIUS = Math.floor(Math.random() * 10) + 5;
    Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.randomAsteroid = function (dimX, dimY) {
    var startLoc = Math.random()
    var x = 0;
    var y = 0;
    if (startLoc < 0.25) {
      // start on top edge
      x = Math.random() * dimX;
      y = 0;
    } else if (startLoc < 0.5) {
      // start on bottom edge
      x = Math.random() * dimX;
      y = dimY;
    } else {
      // start on right edge
      x = dimX;
      y = Math.random() * dimY;
    } 

  return new Asteroid( [x, y], randomVelocity());
  };



})(this);