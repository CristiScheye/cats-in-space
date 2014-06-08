(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function (pos, angle) {
    this.pos = pos;
    this.vel = [10 * Math.cos(Math.PI / 180 * angle), 10 * Math.sin(Math.PI / 180 * angle)];
    this.ang = angle;
    Asteroids.MovingObject.call(this, pos, this.vel, Bullet.LENGTH, Bullet.COLOR);
  };

  Bullet.COLOR = '#00ff0d';
  Bullet.LENGTH = 30;
  Bullet.WIDTH = 5;
  
  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.draw = function (ctx) {
    ctx.strokeStyle = Bullet.COLOR;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.pos[0] + this.vel[0] * 5, this.pos[1] + this.vel[1] * 5);
    ctx.stroke();
  }

  Bullet.prototype.hitAsteroids = function(asteroid){
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