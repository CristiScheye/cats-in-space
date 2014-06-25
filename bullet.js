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
  };

  Bullet.prototype.isCollidedWith = function(object){
    var front_x = this.pos[0] + this.vel[0] * 5;
    var front_y = this.pos[1] + this.vel[1] * 5;
    var x = object.pos[0];
    var y = object.pos[1];
    
    var dist = Math.sqrt(Math.pow(front_x - x, 2) + Math.pow(front_y - y, 2));
    return dist < object.radius;
  };

})(this);