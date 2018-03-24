window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var startButton = document.getElementById("start");
var scoreboard = document.getElementById("scoreboard");
var score1 = document.getElementById("score1");
var score2 = document.getElementById("score2");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var keyW = false;
var keyS = false;
var keyUp = false;
var keyDown = false;
var player1X = 10;
var player1Y = 360;
var player2X = 780;
var player2Y = 360;
var raf;
var running = false;

var player1Score = 0;
var player2Score = 0;

function init() {
	scoreboard.classList.add("display");
}

init();

var ball = {
	x: 400,
	y: 400,
	vx: 5,
	vy: 2,
	radius: 10,
	create: function () {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.fill();	  
	}
}

canvas.width  = 800;
canvas.height = 800;

function draw() {
	window.requestAnimationFrame(draw);
	ctx.clearRect(0, 0, 800, 800);
	ctx.save();
	var player1 = ctx.fillRect(player1X, player1Y, 10, 50);
	ctx.restore();
	ctx.save();
	var player2 = ctx.fillRect(player2X, player2Y, 10, 50);
	ctx.restore();
	ball.create();
	ball.x += ball.vx;
	ball.y += ball.vy;

	var ballCollisionX1 = ball.x - ball.radius;
	var ballCollisionX2 = ball.x + ball.radius;
	var playerCollision1X = player1X + 10;
	var playerCollision1Y = player1Y + 50;
	var playerCollision2X = player2X + 10;
	var playerCollision2Y = player2Y + 50;

	// Canvas Collision
	if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) { 
		ball.vy = -ball.vy;
	}
	if (ball.x + ball.vx > canvas.width) {
		ball.vx = -ball.vx;
		player1Score += 1;
	}
	if (ball.x + ball.vx < 0) {
		ball.vx = -ball.vx;
		player2Score += 1;
	}
	
	// Player Collision Detection
	if (player1X < ball.x + ball.radius && playerCollision1X > ball.x && player1Y < ball.y + ball.radius && playerCollision1Y > ball.y) {
		ball.vx = -ball.vx;
	}
	if (player2X < ball.x + ball.radius && playerCollision2X > ball.x && player2Y < ball.y + ball.radius && playerCollision2Y > ball.y) {
		ball.vx = -ball.vx;
	}

	// Player Movement
	if (keyS == true) {
		player1Y = Math.min(750, player1Y += 5);
	}
	if (keyW == true) {
		player1Y = Math.max(0, player1Y -= 5);
	}
	if (keyDown == true) {
		player2Y = Math.min(750, player2Y += 5);
	}
	if (keyUp == true) {
		player2Y = Math.max(0, player2Y -= 5);
	}

	score1.textContent = player1Score;
	score2.textContent = player2Score;
}

startButton.addEventListener("click", function() {
	scoreboard.classList.remove("display");
	window.requestAnimationFrame(draw);
});

function onKeyDown(event) {
  	var keyCode = event.keyCode;
  	switch (keyCode) {
	    case 83: // s
	    	keyS = true;
	    	break;
	    case 87: // w
			keyW = true;
			break;
		case 40: // Down
			keyDown = true;
			break;
		case 38: // Up
			keyUp = true;
			break;
  	}
}

function onKeyUp(event) {
  	var keyCode = event.keyCode;
	switch (keyCode) {
	    case 83: // s
	      	keyS = false;
	      	break;
	    case 87: // w
	      	keyW = false;
		  break;
		case 40: // Down
			keyDown = false;
		  	break;
	  	case 38: // Up
		  	keyUp = false;
		  	break;
  	}
}
