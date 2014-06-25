(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  function randomVelocity () {
    var dx = (Math.random() * 2 - 1) * 3;
    var dy = (Math.random() * 2 - 1) * 3;
    return [ dx, dy ];
  }

  var Asteroid = Asteroids.Asteroid = function (pos, vel, coords) {
    this.color = 'white';
    var radius = Math.random() * 15 + 15;
    Asteroids.MovingObject.call(this, pos, vel, radius, this.color);
    this.coords = coords;
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.randomAsteroid = function (dimX, dimY) {
    var startLoc = Math.random()
    var x, y;
    if (startLoc < 0.25) {
      // start on top edge
      x = Math.random() * dimX;
      y = 0;
    } else if (startLoc < 0.5) {
      // start on bottom edge
      x = Math.random() * dimX;
      y = dimY;
    } else if (startLoc < 0.75) {
      // start on right edge
      x = dimX;
      y = Math.random() * dimY;
    } else {
      // start on left edge
      x = 0;
      y = Math.random() * dimY;
    }

    return this.createAsteroid([x,y], randomVelocity());
  };

  Asteroid.prototype.createAsteroid = function (pos, vel) {
    var coords  = [];
    var pt_angle = 0;
    var x, y, radius;
    while (pt_angle < 360) {
      radius = (Math.random() * 15 ) + 30;
      x = pos[0] + Math.cos(Math.PI / 180 * pt_angle) * radius;
      y = pos[1] + Math.sin(Math.PI / 180 * pt_angle) * radius;
      coords.push([x, y]);
      pt_angle += Math.random() * 40 + 20; //add 20 - 60 deg each time
    }

    return new Asteroid(pos, vel, coords);
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.moveTo(this.coords[0][0], this.coords[0][1]);

    for(var i = 1; i < this.coords.length; i++) {
      ctx.lineTo(this.coords[i][0], this.coords[i][1]);
    }
    ctx.closePath();
    ctx.strokeStyle = this.color;
    ctx.stroke();
  };

  Asteroid.prototype.move = function () {
    var dx = this.vel[0];
    var dy = this.vel[1];
    this.pos = [this.pos[0] + dx, this.pos[1] + dy];
    this.coords.forEach(function(coord) {
      coord[0] += dx;
      coord[1] += dy;
    })
  },


  Asteroid.prototype.isCollidedWith = function (pt, minDist) {
    function sqr(x) { return x * x }
    function dist2(v, w) { return sqr(v[0] - w[0]) + sqr(v[1] - w[1]) }
    function distToSegmentSquared(p, v, w) {
      var l2 = dist2(v, w);
      if (l2 == 0) return dist2(p, v);
      var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
      if (t < 0) return dist2(p, v);
      if (t > 1) return dist2(p, w);
      return dist2(p, [v[0] + t * (w[0] - v[0]), v[1] + t * (w[1] - v[1])]);
    }

    function distToSegment(p, v, w) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

    for(var i = 0; i < this.coords.length; i++){
      var ptA = this.coords[i];
      var ptB;

      console.log("checking collisions in Asteroid class")

      if (i == this.coords.length - 1) {
        ptB = this.coords[0];
      } else {
        ptB = this.coords[i + 1];
      }
      debugger;
      console.log(distToSegment(pt, ptA, ptB))
      if (minDist >= distToSegment(pt, ptA, ptB)) {
        return true;
      }
    }
    return false;
  }


})(this);