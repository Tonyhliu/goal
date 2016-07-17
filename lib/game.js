const Player = require('./player');
const Ball = require('./ball');
const Computer = require('./computer');

const Game = function(ctx, width, height) {
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  this.width = width;
  this.height = height;
  this.ctx = ctx;

  this.player = new Player(this.ctx);
  this.computer = new Computer(this.ctx);
  this.ball = new Ball(this.width/2, this.height/2, this.ctx, this);

  this.playerScore = 0;
  this.computerScore = 0;
};

// Runs game
const animate = window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
            function(cb) {
              window.setTimeout(cb, 1000 / 60);
            };

Game.prototype.renderGameStart = function () {
  $('.new').html("Use the up & down arrow keys to outscore your opponent! <br> Click to start");
  $('.new').on('click', this.start.bind(this));
};

Game.prototype.start = function() {
  document.getElementById('whistle').play();
  $(".new").html("");
  $(".new").css("padding", 0);
  this.animation = animate(this.step.bind(this));
};

Game.prototype.step = function() {
  this.update();
  this.render();
  if (this.playerScore === 7 || this.computerScore === 7) {
    this.renderGameOver();
  } else {
    animate(this.step.bind(this));
  }
};

Game.prototype.renderGameOver = function () {
  $('.retry').html("Try again?");
  $('.retry').on('click', this.reset.bind(this));
};

Game.prototype.drawDotted = function() {
  this.ctx.beginPath();
    this.ctx.setLineDash([5, 15]);
    this.ctx.lineWidth = 6;
    this.ctx.moveTo(this.width/2, 0);
    this.ctx.lineTo(this.width/2, this.height);
  this.ctx.closePath();
  this.ctx.strokeStyle = '#DCDCDC';
  this.ctx.stroke();
};

Game.prototype.update = function() {
  this.ball.update(this.player.paddle, this.computer.paddle);
  this.computer.update(this.ball);
  this.player.update();
};

Game.prototype.reset = function () {
  this.ctx.clearRect (0, 0, this.width, this.height);
  this.playerScore = 0;
  this.computerScore = 0;
  this.player.reset();
  this.computer.reset();
  $('.end').html('');
  window.cancelAnimationFrame(this.animation);
  this.start();
};

Game.prototype.score = function(){
  this.ctx.font = '90px Roboto';
  this.ctx.fillStyle = "#000";
  this.ctx.fillText(this.computerScore, 430, 90);
  this.ctx.fillText(this.playerScore, 620, 90);
};

Game.prototype.render = function() {
  this.ctx.fillStyle = "#4CAF50";
  this.ctx.fillRect(0, 0, this.width, this.height);

  this.drawDotted();
  this.score();

  this.player.render();
  this.computer.render();
  this.ball.render();
};


module.exports = Game;
