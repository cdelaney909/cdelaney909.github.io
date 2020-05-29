// global variables
var speedOfPaddle1 = 0;
var speedOfPaddle2 = 0;

const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;

var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;
const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameBoardHeight = document.getElementById("gameBoard").offsetHeight;
const gameBoardWidth = document.getElementById("gameBoard").offsetWidth;

var ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = 0;
var score2 = 0;

var pong = new sound("pong.mp3");
var ping = new sound ("ping.mp3");

var num = 5;

//used to control game start and stop
var controlPlay;



//start Ball Motion
/*window.addEventListener('load',function() {
	startBall();
});*/


	

//Move Paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down" + e.keyCode);
	if(e.keycode == 87 || e.which == 87) {
		speedOfPaddle1 = -10;
	}//if
	
	if(e.keycode == 83 || e.which == 83) {
		speedOfPaddle1 = 10;
	}//if
	
	if(e.keycode == 40 || e.which == 40) {
		speedOfPaddle2 = 10;
	}//if
	
	if(e.keycode == 38 || e.which == 38) {
		speedOfPaddle2 = -10;
	}//if
	
	

});

//Stops Paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up" + e.keyCode);
	if(e.keycode == 87 || e.which == 87) {
		speedOfPaddle1 = 0;
	}//if
	
	//console.log("key up" + e.keyCode);
	if(e.keycode == 83 || e.which == 83) {
		speedOfPaddle1 = 0;
	}//if
	
	if(e.keycode == 38 || e.which == 38) {
		speedOfPaddle2 = 0;
	}//if
	
	//console.log("key up" + e.keyCode);
	if(e.keycode == 40 || e.which == 40) {
		speedOfPaddle2 = 0;
	}//if

});

//Object constructor to place sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


function startBall() {
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	// 50% chance of statring in either direction
	if (Math.random() < 0.5) {
		direction = 1;
	} else {
		direction = -1;
	}
	topSpeedOfBall = Math.random() * 2 + num;
	leftSpeedOfBall = direction * (Math.random() * 2 + num);
	
	num += 0.25;
	
}//startBall


//Updates loctaions of paddles and balls
function show(){
	
	//update position of elements
	positionOfPaddle2 += speedOfPaddle2;
	positionOfPaddle1 += speedOfPaddle1;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stop paddle from leaving top of gameBoard
	if(positionOfPaddle1 <=0) {
		positionOfPaddle1 = 0;
	}//if
	
	if(positionOfPaddle2 <=0) {
		positionOfPaddle2 = 0;
	}//if
	
	//stop paddle from leaving bottom of gameBoard
	
	if(positionOfPaddle1 >= gameBoardHeight - paddleHeight){
		positionOfPaddle1 = gameBoardHeight - paddleHeight;
	}//if
	
	if(positionOfPaddle2 >= gameBoardHeight - paddleHeight){
		positionOfPaddle2 = gameBoardHeight - paddleHeight;
	}//if
	
	//if ball hits top or bottom of screen, change direction;
	if (topPositionOfBall <= 0 || topPositionOfBall >= gameBoardHeight - ballHeight) {
		topSpeedOfBall *= -1;
	}//if
	
	//ball on left edge of gamebord
	if (leftPositionOfBall <= paddleWidth) {
		
		//if  ball hits left paddle, change direction
		if (topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight) {
			pong.play();
			leftSpeedOfBall *= -1;
			
		}else{
			ping.play();
			score2++;
			startBall();
		}//else
	}//if

	//ball on right edge of gameBoard
	if (leftPositionOfBall >= gameBoardWidth - paddleWidth - ballHeight) {
		
		//if  ball hits right paddle, change direction
		if (topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight) {
			pong.play();
			leftSpeedOfBall *= -1;
		}else{
			ping.play();
			score1++;
			startBall();
		}//else
	}//if
	
	changeBallColor();

	if(score1 == 10 || score2 == 10) {
		stopGame();
	}
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	document.getElementById("score1").innerHTML = score1;
	document.getElementById("score2").innerHTML = score2;
	
}//show

//reumes Game
function resumeGame() {
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}

function pauseGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame


function startGame() {
	//reset scores, ball and paddles
	score1 = 0;
	score2 = 0;
	num = 5;
	
	startBall();
	
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	
	let myElement = document.querySelector("#ball");
	myElement.style.backgroundColor = "#cc0000";
	
	
	
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}//if
}//startGame

function stopGame() {
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	
	//show lightbox with score1
	let message1 = "Tie Game";
	let message2 = "Close to Continue";
	
	if (score2 > score1) {
		 message1 = "Player 2 Wins With " + score2 + " Points!";
		 message2 = "Player 1 had " + score1 + " Points";
	}else if(score1 > score2) {
		message1 = "Player 1 Wins With " + score1 + " Points!";
		 message2 = "Player 2 had " + score2 + " Points";
	}
	
	showLightBox(message1, message2);
}//pauseGame


/*** LightBox Code***/

// change visibilty of divID
function changeVisibility (divID){
	var element = document.getElementById(divID);
	
	//if element exists, toggle its class name
	//between hidden and unhidden
	if(element) {
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
}//changeVisibility

//display meassage in light box
function showLightBox(message, message2) {
	
	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	
	//show lightbox
	changeVisibility("boundaryMessage");
	changeVisibility("lightbox");
	
}

function continueGame(){
	changeVisibility("boundaryMessage");
	changeVisibility("lightbox");
	
}//continueGame

function changeBallColor() {
	let myElement = document.querySelector("#ball");
	
	if (score1 == 1 || score2 == 1){
        myElement.style.backgroundColor = "#e60000";
	}
	if (score1 == 2 || score2 == 2){
        myElement.style.backgroundColor = "#ff0000";
	}
	if (score1 == 3 || score2 == 3){
        myElement.style.backgroundColor = "#ff1a1a";
	}
	if (score1 == 4 || score2 == 4){
        myElement.style.backgroundColor = "#ff3333";
	}
	if (score1 == 5 || score2 == 5){
        myElement.style.backgroundColor = "#ff6666";
	}
	if (score1 == 6 || score2 == 6){
        myElement.style.backgroundColor = "#ff8080";
	}
	if (score1 == 7 || score2 == 7){
        myElement.style.backgroundColor = "#ffb3b3";
	}
	if (score1 == 8 || score2 == 8){
        myElement.style.backgroundColor = "#ffcccc";
	}
	if (score1 == 9 || score2 == 9){
        myElement.style.backgroundColor = "white";
	}
}




