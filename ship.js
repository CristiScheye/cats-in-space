(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(pos){
    Asteroids.MovingObject.call(this, pos, [0, 0], Ship.RADIUS, Ship.COLOR);
    this.bullets = [];
  };

  Ship.RADIUS = 15;
  Ship.COLOR = 'aquamarine';
  MAX_VEL = 5;

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse){
    this.vel = [impulse[0] * MAX_VEL, impulse[1] * MAX_VEL];
  };

  Ship.prototype.fireBullet = function () {
    this.bullets.push(new Asteroids.Bullet(this.pos, this.vel));
  }

})(this);