const Game = require('./game');

document.addEventListener("DOMContentLoaded", function(ctx, width, height) {
  const canvas = document.getElementsByTagName("canvas")[0];

  canvas.width = 1100;
  canvas.height = 600;
  this.ctx = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;

  const game = new Game(this.ctx, this.width, this.height);
  game.renderGameStart();
});
