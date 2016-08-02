const Player = require('./player');
// const Ball = require('./ball');
const SoccerBall = require('./soccerball');
const Computer = require('./computer');

const Game = function(ctx, width, height) {
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;
  this.width = width;
  this.height = height;
  this.ctx = ctx;

  this.player = new Player(this.ctx);
  this.computer = new Computer(this.ctx);
  this.ball = new SoccerBall(this.width/2, this.height/2, this.ctx, this);

  this.playerScore = 0;
  this.computerScore = 0;
};

const animate = window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
            function(cb) {
              window.setTimeout(cb, 1000 / 60);
            };

Game.prototype.renderGameStart = function () {
  $('.new').html("Welcome to GOAL. <br> Use the up &#8593 & down &#8595 keys to outscore your opponent! <br> <br> First to 5 points wins <br> <br>Click to start");
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
  if (this.playerScore === 5) {
    this.renderGameOver("player");
  } else if (this.computerScore === 5) {
    this.renderGameOver("computer");
  } else {
    animate(this.step.bind(this));
  }
};

String.prototype.capitalize = function() {
  return this.slice(0,1).toUpperCase() + this.slice(1);
};

Game.prototype.renderGameOver = function (winner) {
  var win = winner.capitalize();
  $('.retry').html(win + " wins! Try again?");
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
  $('.retry').html('');
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
