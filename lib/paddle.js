const Paddle = function(x, y, width, height, ctx) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
  this.ctx = ctx;
};

Paddle.prototype.render = function () {
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(y) {
  this.y += y;
  if (this.y < 0) {
    this.y = 0;
  } else if (this.y + this.height > 600) {
    this.y = 600 - this.height;
  }
};

Paddle.prototype.reset = function (x, y) {
  this.x = x;
  this.y = y;
};

module.exports = Paddle;
