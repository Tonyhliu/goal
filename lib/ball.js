const Game = require('./game');

const Ball = function(x, y, ctx, game) {
  this.ctx = ctx;
  this.x = x;
  this.y = y;
  this.dx = 10;
  this.dy = 0;
  this.ballRadius = 15;
  this.game = game;
};

Ball.prototype.render = function () {
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.ballRadius, 2 * Math.PI, false);
  this.ctx.fillStyle = "Black";
  this.ctx.fill();
  this.ctx.closePath();
};

Ball.prototype.update = function (pad1, pad2) {
  this.x += this.dx;
  this.y += this.dy;

  const leftX = this.x - this.ballRadius;
  const rightX = this.x + this.ballRadius;
  const topY = this.y - this.ballRadius;
  const botY = this.y + this.ballRadius;

  // hit top wall
  if (this.y - this.ballRadius < 0 ) {
    this.y = this.ballRadius;
    this.dy = -this.dy;
  } else if (this.y + this.ballRadius > 600) {
    this.y = 585;
    this.dy = -this.dy;
  }

  // point was scored
  if (this.x < 0) {
    document.getElementById('ole').play();
    this.game.playerScore += 1;
    this.dx = -this.dx;
    this.dy = -this.dy;
    this.x = 550;
    this.y = 300;
  } else if (this.x > 1100) {
    document.getElementById('ole').play();
    this.game.computerScore += 1;
    this.dx = this.dx;
    this.dy = -this.dy;
    this.x = 350;
    this.y = 300;
  }

  if (leftX < (pad1.x + pad1.width)
      && rightX > pad1.x
      && botY - 5 > pad1.y
      && topY < (pad1.y + pad1.height)) {
        const relativeIntersectY = (pad1.y + (pad1.height / 2)) - this.y;
        const normalizedY = (relativeIntersectY / (pad1.height / 2));
        const bounceAngle = normalizedY * 3 * Math.PI/12;
        this.dx = -12 * Math.cos(bounceAngle);
        this.dy = 12 * Math.sin(bounceAngle);
      }
  else if (leftX < (pad2.x + pad2.width)
      && rightX > pad2.x
      && botY > pad2.y
      && topY < (pad2.y + pad2.height)) {
        const relativeIntersectY = (pad2.y + (pad2.height / 2)) - this.y;
        const normalizedY = (relativeIntersectY / (pad2.height / 2));
        const bounceAngle = normalizedY * 3*Math.PI/12;
        this.dx = 12 * Math.cos(bounceAngle);
        this.dy = 12 * -Math.sin(bounceAngle);
      }
};

Ball.prototype.reset = function () {
  this.x = 450;
  this.y = 300;
  this.dx = 12;
  this.dy = 0;
};


module.exports = Ball;
