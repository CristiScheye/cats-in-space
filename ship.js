(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0, 0], Ship.RADIUS, Ship.COLOR);
    this.bullets = [];
    this.img = new Image();
    this.img.src = 'SpaceCatSmall.png'
  };

  MAX_VEL = 5;

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.vel = [impulse[0] * MAX_VEL, impulse[1] * MAX_VEL];
  };

  Ship.prototype.fireBullet = function () {
    var bullet_x = this.pos[0] + this.img.width * 0.6;
    var bullet_y = this.pos[1] + this.img.height * 0.5;
    this.bullets.push(new Asteroids.Bullet([bullet_x, bullet_y], this.vel));
  };

  Ship.prototype.draw = function () {
    ctx.drawImage(this.img, this.pos[0], this.pos[1]);
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