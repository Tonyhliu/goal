const Paddle = require('./paddle');
const Ball = require('./ball');

const Computer = function(ctx) {
  this.paddle = new Paddle(10, 250, 15, 100, ctx);
};

Computer.prototype.render = function () {
  // console.log(this.paddle);
  this.paddle.render();
};

Computer.prototype.update = function (ball) {
  const yPos = ball.y;

  let diff = -((this.paddle.y + (this.paddle.height / 2)) - yPos);

  if (diff < -4) {
    diff = -5;
  } else if (diff > 4) {
    diff = 5;
  }

  // speed up diff to make it a harder AI
  this.paddle.move(diff - 1.5);
  if (this.paddle.y < 0) {
    this.paddle.y = 0;
  } else if (this.paddle.y + this.paddle.height > 600) {
    this.paddle.y = 600 - this.paddle.height;
  }
};

Computer.prototype.reset = function () {
  this.paddle.reset(10, 250);
};

module.exports = Computer;