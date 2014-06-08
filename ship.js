(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0, 0], Ship.RADIUS, Ship.COLOR);
    this.bullets = [];
    this.img = new Image();
    this.img.src = 'SpaceCatSmall.png'
    this.ang = 0;
    this.speed = 0;
    this.vel = [0,0];
  };

  MAX_SPEED = 5;

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.speed += impulse

    if (this.speed > MAX_SPEED) {
      this.speed = MAX_SPEED;
    } else if (-1 * this.speed < -1 * MAX_SPEED) {
      this.speed = -1 * MAX_SPEED;
    }
    this.updateVelocity();
  };

  Ship.prototype.rotate = function (angle) {
    this.ang += angle;
  };

  Ship.prototype.updateVelocity = function () {
    this.vel[0] = Math.cos(Math.PI / 180 * this.ang) * this.speed;
    this.vel[1] = Math.sin(Math.PI / 180 * this.ang) * this.speed;
  };

  Ship.prototype.fireBullet = function () {
    var bullet_x = this.pos[0] + this.img.width * 0.6;
    var bullet_y = this.pos[1] + this.img.height * 0.5;
    this.bullets.push(new Asteroids.Bullet([bullet_x, bullet_y], this.vel));
  };

  Ship.prototype.draw = function () {
    ctx.save(); //saves the state of canvas
    ctx.translate(this.pos[0], this.pos[1]); // translate origin to image's pos
    ctx.translate(this.img.width / 2, this.img.height / 2); // translate to image's center (1/2 height and width)
    ctx.rotate(Math.PI / 180 * this.ang) // rotate around pt
    ctx.drawImage(this.img, -(this.img.width / 2), -(this.img.height / 2)); // draw image back and up
    ctx.restore(); // restore coord sys
  },

  Ship.prototype.isCollidedWith = function (otherObj) {
    radius = this.img.height * 0.4;
    x1 = this.pos[0] + (this.img.width / 2);
    y1 = this.pos[1] + (this.img.height / 2);

    //presuming other objects are circles
    var x2 = otherObj.pos[0];
    var y2 = otherObj.pos[1];
    var minDist = radius + otherObj.radius;

    var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return (minDist >= distance);
  }

})(this);