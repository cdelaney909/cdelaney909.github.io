let currentPlayer = "X";
let gameStatus = ""; // "" - continue game, "Tie", " X Wins", "O Wins"
let numTurns = "0"

function playerTakeTurn(e){
	if(e.innerHTML == ""){
	e.innerHTML = currentPlayer;
	checkGameSatus();
	}else{
		showLightBox("This Box is already selected.", "Please try again");
		return;
	}//else
		
	
	if(gameStatus != "") {
		showLightBox(gameStatus, "Game Over.");
	}
}//playerTakeTurn

function checkGameSatus(){
	numTurns++;
	 //check for win
	if (checkWin()) {
		gameStatus = currentPlayer + " Wins!";
		return;
	}//if 
	
	//check for Tie
	if(numTurns == 9) {
		gameStatus = "Tie Game";
	}//if
	
	currentPlayer = (currentPlayer == "X" ? "O" : "X");
	
}//checkGameSatus


//check for win; there are 8 paths
function checkWin() {
	let cb = []; //current board array
	
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
}