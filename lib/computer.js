const Paddle = require('./paddle');

const Computer = function(ctx) {
  this.paddle = new Paddle(10, 250, 15, 100, ctx);
};

Computer.prototype.render = function () {
  this.paddle.render();
};

Computer.prototype.update = function (ball) {
  const ballPosY = ball.y;

  var diff = -((this.paddle.y + (this.paddle.height / 2)) - ballPosY);

  if (diff < -4) {
    diff = -4;
  } else if (diff > 4) {
    diff = 4;
  }

  this.paddle.move(diff);
  if (this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 550) {
    this.paddle.y = 600 - this.paddle.height;
  }
};

Computer.prototype.reset = function () {
  this.paddle.reset(10, 250);
};

module.exports = Computer;
