let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", " X Wins", "O Wins"
let numTurns = "0"
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let cb = []; //current board array

//reset board and all variables
function newGame(){
	
	//reset board
	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
		
	}//for
	
	//reset variables
	numTurns = 0;
	gameStatus = "";
	currentPlayer = "X";
	
	changeVisibility("controls");
	
}//newGame




function playerTakeTurn(e){
	if(e.innerHTML == ""){
	e.innerHTML = currentPlayer;
	checkGameSatus();
	
	//if game not over, computer goes
		if (gameStatus == ""){
			setTimeout(function(){
				computerTakeTurn();
				checkGameSatus();
			
			}, 500
		);
		}//if
	
	
	}else{
		showLightBox("This Box is already selected.", "Please try again");
		return;
	}//else
	
}//playerTakeTurn

function checkGameSatus(){
	numTurns++;
	
	 //check for win
	if (checkWin()) {
		gameStatus = currentPlayer + " Wins!";
	}//if 
	
	//check for Tie
	if(numTurns == 9) {
		gameStatus = "Tie Game";
	}//if
	
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
	
	//game is over
	if(gameStatus != "") {
		setTimeout(function(){showLightBox(gameStatus, "Game Over.");},500 );
	}//if
	
}//checkGameSatus


//check for win; there are 8 paths
function checkWin() {
	
	cb[0] = "";//not in use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	//top row
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}//if
	
	//middle row
	if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
		return true;
	}//if
	//bottom row
	if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
		return true;
	}//if	
	//left colum
	if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
		return true;
	}//if	
	//middle colum
	if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}//if	
	//right colum
	if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
		return true;
	}//if
	//left diagnol
	if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
		return true;
	}//if
	//right diagnol
	if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
		return true;
	}//if
	
	
	
	
}//checkWin 

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
	
	//if Game is over show controls
	
	if (gameStatus != "") {
		changeVisibility("controls");
	}//if
	
}//continueGame

//randomly choose a free box for computer
function computerTakeTurn(){
	let idName = "";
	let rand = "";
	
	cb[0] = "";//not in use
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	do{
		//top row 1,2,3
		if(cb[1] == "" && cb[2] != "" && cb[2] == cb[3]){
			rand = 1;
		}else if(cb[2] == "" && cb[1] != "" && cb[1] == cb[3]){
			rand = 2;
		}else if(cb[3] == "" && cb[1] != "" && cb[1] == cb[2]){
			rand = 3;
			//left colum 1,4,7
		}else if(cb[1] == "" && cb[4] != "" && cb[4] == cb[7]){
			rand = 1;
		}else if(cb[4] == "" && cb[1] != "" && cb[1] == cb[7]){
			rand = 4;
		}else if(cb[7] == "" && cb[1] != "" && cb[1] == cb[4]){
			rand = 7;
			//center colum 2,5,8
		}else if(cb[2] == "" && cb[5] != "" && cb[5] == cb[8]){
			rand = 2;
		}else if(cb[5] == "" && cb[2] != "" && cb[2] == cb[8]){
			rand = 5;
		}else if(cb[8] == "" && cb[2] != "" && cb[2] == cb[5]){
			rand = 8;
			//right colum 3,6,9
		}else if(cb[3] == "" && cb[6] != "" && cb[6] == cb[9]){
			rand = 3;
			//middle row 4,5,6
		}else if(cb[4] == "" && cb[5] != "" && cb[5] == cb[6]){
			rand = 4;
		}else if(cb[5] == "" && cb[4] != "" && cb[4] == cb[6]){
			rand = 5;
		}else if(cb[6] == "" && cb[4] != "" && cb[4] == cb[5]){
			rand = 6;
			//bottom row 7,8,9
		}else if(cb[7] == "" && cb[8] != "" && cb[8] == cb[9]){
			rand = 7;
		}else if(cb[8] == "" && cb[7] != "" && cb[7] == cb[9]){
			rand = 8;
		}else if(cb[9] == "" && cb[7] != "" && cb[7] == cb[8]){
			rand = 9;
			//left diagnol 1,5,9
		}else if(cb[1] == "" && cb[5] != "" && cb[5] == cb[9]){
			rand = 1;
		}else if(cb[5] == "" && cb[1] != "" && cb[1] == cb[9]){
			rand = 5;
		}else if(cb[9] == "" && cb[1] != "" && cb[1] == cb[5]){
			rand = 9;
			//right diagnol 3,5,7
		}else if(cb[3] == "" && cb[5] != "" && cb[5] == cb[7]){
			rand = 3;
		}else if(cb[5] == "" && cb[3] != "" && cb[3] == cb[7]){
			rand = 5;
		}else if(cb[7] == "" && cb[3] != "" && cb[3] == cb[5]){
			rand = 7;
		}else
		rand = parseInt(Math.random()*9) + 1;
	
		//check id div tag is empty
		idName = idNames[rand-1];
		if (document.getElementById(idName).innerHTML == ""){
			document.getElementById(idName).innerHTML = currentPlayer;
			break;
		}//if
		
	}while(true);
}//computerTakeTurn


