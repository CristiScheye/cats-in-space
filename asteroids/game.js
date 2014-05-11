(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx){
    this.ctx = ctx;
    this.FPS = 30;
    this.asteroids = [];
    this.ship = new Asteroids.Ship([Game.DIM_X / 5, Game.DIM_Y / 2]);
  };

  Game.DIM_X = 1000;
  Game.DIM_Y = 800;

  Game.prototype.addAsteroids = function(nAsteroids){
    for(var i = 0; i < nAsteroids; i++){
      this.asteroids.push(Asteroids.Asteroid.prototype.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
  };

  Game.prototype.removeOffBoardAsteroids = function() {
    var asteroids = this.asteroids;
    for (var i = 0; i < asteroids.length; i++) {
      if (asteroids[i].pos[0] < 0){
        asteroids.splice(i, 1);
      }
    }
  };

  Game.prototype.removeOffBoardBullets = function() {
    var bullets = this.ship.bullets;
    var bulletX, bulletY;
    for (var i = 0; i < bullets.length; i++) {
      bulletX = bullets[i].pos[0];
      bulletY = bullets[i].pos[1];
      if (
        bulletX > Game.DIM_X ||
        bulletY > Game.DIM_Y ||
        bulletX < 0 ||
        bulletY < 0
        ){
        bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.resetShip = function () {
    var shipX = this.ship.pos[0];
    var shipY = this.ship.pos[1];


    if (shipX < 0 || shipX > Game.DIM_X || shipY < 0 || shipY > Game.DIM_Y) {
      this.ship.pos[0] = Game.DIM_X / 5;
      this.ship.pos[1] = Game.DIM_Y / 2;
    }
     console.log(shipX, shipY, this.ship.pos);
  };

  Game.prototype.checkCollisions = function () {
    var asteroids = this.asteroids;
    for(var i = 0; i < asteroids.length; i++){
      if(asteroids[i].isCollidedWith(this.ship)){
        alert("Asteroids Strike Again!");
        this.stop();
      }
    }
  };

  Game.prototype.removeHitAsteroids = function(){
    var bullets = this.ship.bullets;
    var asteroids = this.asteroids;
    for(var i = 0; i < bullets.length; i++){
      for(var j = 0; j < asteroids.length; j++){
        if (bullets[i].hitAsteroids(asteroids[j])){
          asteroids.splice(j, 1);
          bullets.splice(i, 1);
        }
      }
    }
  };

  Game.prototype.outOfBounds = function () {
    this.removeOffBoardAsteroids();
    this.removeOffBoardBullets();
    this.resetShip();
  }

  Game.prototype.bindKeyHandlers = function(){
    var ship = this.ship;
    key('down', function(){
      ship.power([0, 1]);
    });
    key('up', function(){
      ship.power([0, -1]);
    });
    key('left', function(){
      ship.power([-1, 0]);
    });
    key('right', function(){
      ship.power([1, 0]);
    });
    key('space', function(){
      console.log('space was pressed');
      ship.fireBullet();
    })
  }

  Game.prototype.stop = function(){
    clearInterval(this.timerId);
  };

  Game.prototype.draw = function(){
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.ship.draw(this.ctx);
    var asteroids = this.asteroids;
    for(var i = 0; i < asteroids.length; i++){
      asteroids[i].draw(this.ctx);
    }
    var bullets = this.ship.bullets;
    for(var i = 0; i < bullets.length; i++){
      bullets[i].draw(this.ctx);
    }
  };

  Game.prototype.move = function(){
    this.ship.move();
    var asteroids = this.asteroids;
    for(var i = 0; i < asteroids.length; i++){
      asteroids[i].move();
    }
    var bullets = this.ship.bullets;
    for(var i = 0; i < bullets.length; i++){
      bullets[i].move();
    }
  };

  Game.prototype.step = function(){
    this.move();
    this.outOfBounds();
    this.addAsteroids(Math.floor(Math.random() * 1.2));
    this.removeHitAsteroids();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.start = function(){
    var game = this;
    this.bindKeyHandlers();
    game.addAsteroids(10);
    this.timerId = setInterval(function(){
      game.step();
    }, game.FPS);
  };
})(this);