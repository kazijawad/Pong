window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var keyW = false;
var keyS = false;
var keyUp = false;
var keyDown = false;
var player1X = 10;
var player1Y = 10;
var player2X = 780;
var player2Y = 10;
var raf;
var running = false;

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

	var ballCollisionX = ball.x - ball.radius;
	var ballCollisionY = ball.y - ball.radius;

	if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) { 
		ball.vy = -ball.vy;
	} 
	if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
		ball.vx = -ball.vx;
	}
	if (ballCollisionX == player1X || ballCollisionY == player1Y) {
		ball.vx = -ball.vx;
	}
	if (ballCollisionX == player2X || ballCollisionY == player2Y) {
		ball.vx = -ball.vx;
	}
 
	if (keyS == true) {
		player1Y += 5;
	}
	if (keyW == true) {
  		player1Y -= 5;
	}
	if (keyDown == true) {
		player2Y += 5;
	}
	if (keyUp == true) {
		player2Y -= 5;
	}
}

window.requestAnimationFrame(draw);

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
