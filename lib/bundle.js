/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function(ctx, width, height) {
	  const canvas = document.getElementsByTagName("canvas")[0];
	
	  canvas.width = 1100;
	  canvas.height = 550;
	  this.ctx = canvas.getContext("2d");
	  this.width = canvas.width;
	  this.height = canvas.height;
	
	  const game = new Game(this.ctx, this.width, this.height);
	  game.renderGameStart();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Player = __webpack_require__(2);
	// const Ball = require('./ball');
	const SoccerBall = __webpack_require__(4);
	const Computer = __webpack_require__(5);
	
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
	    this.ctx.moveTo(550, 0);
	    this.ctx.lineTo(550, this.height);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Paddle = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	  } else if (this.y + this.height > 550) {
	    this.y = 550 - this.height;
	  }
	};
	
	Paddle.prototype.reset = function (x, y) {
	  this.x = x;
	  this.y = y;
	};
	
	module.exports = Paddle;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
	const SoccerBall = function(x, y, ctx, game) {
	  this.ctx = ctx;
	  this.x = x;
	  this.y = y;
	  this.dx = 12;
	  this.dy = 0;
	  this.ballRadius = 15;
	  this.game = game;
	};
	
	SoccerBall.prototype.render = function() {
	  const ballImg = new Image();
	  ballImg.src = "http://res.cloudinary.com/dcbb8bnvk/image/upload/v1468795826/ball_iw2htt.png";
	  this.ctx.drawImage(ballImg, this.x, this.y, 40, 40);
	};
	
	SoccerBall.prototype.update = function (pad1, pad2) {
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
	  } else if (this.y + this.ballRadius > 550) {
	    this.y = 535;
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
	      && rightX + 20 > pad1.x
	      && botY > pad1.y
	      && topY < (pad1.y + pad1.height)) {
	        const relativeIntersectY = (pad1.y + (pad1.height / 2)) - this.y;
	        const normalizedY = (relativeIntersectY / (pad1.height / 2));
	        const bounceAngle = normalizedY * 3 * Math.PI/12;
	        this.dx = -13 * Math.cos(bounceAngle);
	        this.dy = 13 * Math.sin(bounceAngle);
	      }
	  else if (leftX < (pad2.x + pad2.width)
	      && rightX - 30 > pad2.x
	      && botY > pad2.y
	      && topY < (pad2.y + pad2.height)) {
	        const relativeIntersectY = (pad2.y + (pad2.height / 2)) - this.y;
	        const normalizedY = (relativeIntersectY / (pad2.height / 2));
	        const bounceAngle = normalizedY * 3*Math.PI/12;
	        this.dx = 13 * Math.cos(bounceAngle);
	        this.dy = 13 * -Math.sin(bounceAngle);
	      }
	};
	
	SoccerBall.prototype.reset = function () {
	  this.x = 450;
	  this.y = 300;
	  this.dx = 12;
	  this.dy = 0;
	};
	
	module.exports = SoccerBall;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Paddle = __webpack_require__(3);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map