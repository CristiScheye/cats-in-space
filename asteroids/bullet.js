(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, vel) {
    bulletVel = [vel[0] * 2, vel[1] * 2] //bullet moves twice as fast as
    Asteroids.MovingObject.call(this, pos, bulletVel, Bullet.LENGTH, Bullet.COLOR);
  };

  Bullet.COLOR = 'red';
  Bullet.LENGTH = 15;
  Bullet.WIDTH = 2;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    var length = Math.abs(this.vel[0] * 2) + 2;
    var width = Math.abs(this.vel[1] * 2) + 2;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], length, width);
  }

  Bullet.prototype.hitAsteroids = function(asteroid){
    console.log('hitAsteroids');
    var minDist = asteroid.radius;
    var x1 = this.pos[0] + Bullet.LENGTH;
    var y1 = this.pos[1] + Bullet.WIDTH/2;
    var x2 = asteroid.pos[0];
    var y2 = asteroid.pos[1];
    var distance = Math.sqrt(
      Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
    );
    return(minDist >= distance);
  }

})(this);