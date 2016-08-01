const Paddle = require('./paddle');

const Player = function(ctx) {
  this.keys = new KeyListener();
  this.paddle = new Paddle(1070, 250, 15, 100, ctx);
};

Player.prototype.render = function() {
  this.paddle.render();
};

Player.prototype.update = function() {
  if (this.keys.isPressed(38)) {
    this.paddle.move(-10);
  } else if (this.keys.isPressed(40)) {
    this.paddle.move(10);
  }
};

Player.prototype.reset = function() {
  this.paddle.reset(1070, 250);
};

function KeyListener() {
  this.pressedKeys = [];

  this.keydown = function(e) {
    this.pressedKeys[e.keyCode] = true;
  };

  this.keyup = function(e) {
    this.pressedKeys[e.keyCode] = false;
  };

  // bind this to KeyListener object NOT the event caller
  document.addEventListener("keydown", this.keydown.bind(this));
  document.addEventListener("keyup", this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function(key) {
  return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function(keyCode, cb) {
  document.addEventListener("keypress", function(e) {
      if (e.keyCode === keyCode) {
        cb(e);
      }
  });
};


module.exports = Player;
