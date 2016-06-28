var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	window.setTimeout(callback, 1000/60);
};

//define canvas and context
var canvas = document.createElement('canvas');
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function(){
	document.body.appendChild(canvas);
	animate(step);
};

var step = function () {
	update();
	render();
	animate(step);
};

var update = function (){
	ball.update(player.paddle, computer.paddle);
};

/*var render = function () {
	context.fillStyle = '#a6e5ff';
	context.fillRect(0,0,width,height)
}*/

function Paddle (x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.x_speed = 0;
	this.y_speed = 0;
}

Paddle.prototype.render = function () {
	context.fillStyle = '#ed143d';
	context.fillRect(this.x, this.y, this.width, this.height);
};

function Player () {
	this.paddle = new Paddle(175, 580, 50, 10);
}

function Computer () {
	this.paddle = new Paddle(175, 10, 50, 10);
}

Player.prototype.render = function(){
	this.paddle.render();
};

Computer.prototype.render = function(){
	this.paddle.render();
};


Ball.prototype.render = function(){
	context.beginPath();
	context.arc(this.x,this.y,this.radius, 2*Math.PI, false);
	context.fillStyle = '#000';
	context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(200,300);

var render = function (){
	context.fillStyle = '#a6e5ff';
	context.fillRect(0,0,width,height);
	player.render();
	computer.render();
	ball.render();
};

function Ball(x,y){
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 3;
	this.radius = 5;
}

Ball.prototype.update = function (paddle1, paddle2){
	var top_x = this.x - 5; //drcha
	var top_y = this.y - 5; //abajo
	var bottom_x = this.x + 5; //
	var bottom_y = this.y + 5; //

	this.x += this.x_speed;
  	this.y += this.y_speed;

  	if (this.y < 0 || this.y > 600){ // minipunto!
  		this.x = 200;
  		this.y = 300;
  		this.x_speed = 0;
  		this.y_speed = 3;
  	}

  	if (top_y > 300){
  		if (top_y < (paddle1.y + paddle1.height)) {
  			this.y_speed = 3;
  			this.y += this.y_speed;
  		} else {
  			this.y_speed = -3;
  			this.y += this.y_speed;
  		}
  	}
};