const levels = [  
	
	 //level 0
   ["flag", "rock", "", "", "",
   "fenceSide", "rock", "", "", "passenger",
   "", "tree", "animate", "animate", "animate",
   "","water","","", "",
   "", "fenceUp", "", "motorcycleup", ""],

	//level 1 
	["flag", "fenceUp", "", "", "motorcycleleft",
   "tree", "water", "bridge animate", "bridge animate", "water",
   "rock", "water", "bridge", "bridge", "water",
   "tree","water","bridge","bridge", "water",
   "tree", "tree", "", "", "passenger"],
   
   //level 2
   ["tree", "fenceUp", "tree", "fenceUp", "tree",
   "flag", "fenceUp", "", "fenceUp", "passenger",
   "motorcycledown", "fenceUp", "rock", "fenceUp", "",
   "", "fenceUp", "", "fenceUp", "",
   "", "animate", "animate", "animate", "animate"],
   
   //level 3
   ["tree", "passenger", "", "water", "motorcycledown",
   "tree", "water", "bridge", "water", "",
   "rock", "fenceUp", "", "water", "",
   "flag", "fenceUp", "", "water", "",
   "tree", "animate", "animate", " bridge animate", "animate"],
   
   //level 4
    ["water", "water", "", "fenceUp", "flag",
   "water", "water", "bridge", "water", "water",
   "bridge animate", "bridge animate", "bridge animate", "bridge animate", "water",
   "bridge", "water", "water", "bridge", "water",
   "motorcycleup", "water", "water", "bridge ","passenger"]
   
   ];

 
var currentLevel = 0;
var passengerOn = false;
var currentLocationOfMotorcycle = 0;
var currentAnimation; //allows one animation per level
var widthOfBoard = 5;
var levelCount = 0;

const gridBoxes = document.querySelectorAll("#gameBoard div"); 
const noPassObstacles = ["rock", "tree", "water"];


//loads level into window
window.addEventListener("load", function () {
	document.getElementById("title").style.display = "block";
	//loadLevel();
});

//move horse
document.addEventListener("keydown", function (e) {
	
	switch (e.keyCode) {
		
		case 37: //left arrow
		  if(currentLocationOfMotorcycle % widthOfBoard !== 0) {
			  tryToMove("left");
		  }//if
		  break;
		case 38: //up arrow
		  if(currentLocationOfMotorcycle - widthOfBoard >= 0) {
			  tryToMove("up");
		  }//if
		  break;
		case 39: //right arrow
		  if(currentLocationOfMotorcycle % widthOfBoard < widthOfBoard - 1) {
			  tryToMove("right");
		  }//if
		  break;
		case 40: //down arrow
		 if(currentLocationOfMotorcycle + widthOfBoard < widthOfBoard * widthOfBoard) {
			  tryToMove("down");
		  }//if
	}//switch
});//key event listener

//load levels 0 - max
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	passengerOn = false;
	
	document.getElementById("title").style.display = "none";
	document.getElementById("five").style.display = "none";
	
	//load board
	for (i = 0; i < gridBoxes.length; i++){
		gridBoxes[i].className = levelMap[i];
		if(levelMap[i].includes("motorcycle")) currentLocationOfMotorcycle = i;
	}//for
	
	animateBoxes = document.querySelectorAll(".animate"); 
	animateEnemy(animateBoxes, 0, "right");
}//loadLevel

//animate enemy left to right
function animateEnemy(boxes, index, direction) {
	
	let checkClass = boxes[index].className;
	
	//ends game if enemy collides with player
	if(checkClass.includes("motorcycle")){
		document.getElementById("lose").style.display = "block";
		clearTimeout(currentAnimation);
		return;
	}
	
	//exit functio if no animati9on
	if (boxes.length <= 0) {return;}
	
	//update images on screen
	if (direction == "right") {
		boxes[index].classList.add("enemyRight");
	} else {
		boxes[index].classList.add("enemyLeft");
	}
	
	//remove images from other boxes
	for(i = 0; i < boxes.length; i++){
	  if (i != index){
		boxes[i].classList.remove("enemyLeft"); 
		boxes[i].classList.remove("enemyRight");
	  }//if
	  
	}//for
	
	if(direction == "right") {
		//trun around if hits right side
		if(index == boxes.length - 1){
			index--;
			direction = "left";
		} else {
			index++;
		}//if else
	//move left	
	} else {
		//turn around if hit left side
		if(index == 0){
			index++;
			direction = "right";
		} else {
			index--;
		}//if else
	}//else
	
  currentAnimation = setTimeout(function() {
	animateEnemy(boxes, index, direction);
  }, 750);
  
	}//animate enemy
	
//try to move horse	
function tryToMove(direction) {
	
	//location before move
	let oldLocation = currentLocationOfMotorcycle;
	
	//class of location before move
	let oldClassName = gridBoxes[oldLocation].className;
	
	let nextLocation = 0; //Location to move to
	let nextClass = 0; //class of location to move to
	
	let newClass = 0; // class to switch to if succesful
	
	let nextLocation2 = 0;
	let nextClass2 = "";
	
	 let location1 = "";
	
	//move horse
	switch (direction) {
		case "left":
		  nextLocation = currentLocationOfMotorcycle - 1;
		  break;
		case "right":
		  nextLocation = currentLocationOfMotorcycle + 1;
		  break;
		case "up":
		  nextLocation = currentLocationOfMotorcycle - widthOfBoard;
		  break;
		case "down":
		  nextLocation = currentLocationOfMotorcycle + widthOfBoard;
		  break;
	}//switch
	
	nextClass = gridBoxes[nextLocation].className;

	//if obstacle is no passable don't move
	if (noPassObstacles.includes(nextClass)) {
		return;
	}//if
	
	//if its a fence, and there is no rider , don't move
	if (!passengerOn && nextClass.includes("fence")){
		return;
	}//if
	
	//if there is a fence, rider is on move horse two spaces and animate
	if(nextClass.includes("fence")) {
		
	
	//get class of landing location after jump
	if (direction == "left") {
		 location1 = nextLocation - 1;
	} else if (direction == "right") {
		 location1 = nextLocation + 1;
	} else if (direction == "up") {
		 location1 = nextLocation - widthOfBoard;
	} else if (direction == "down") {
		 location1 = nextLocation + widthOfBoard;
	}// else if
	
	//assign class of landing spot
	nextClass2 = gridBoxes[location1].className;	
	
	//if landing class contains a non passable object don't jump
	if (noPassObstacles.includes(nextClass2) || nextClass2.includes("fence")) {
		return;
	}//if 
	
		if(passengerOn) {
			gridBoxes[currentLocationOfMotorcycle].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			
			if (direction == "left") {
				nextClass = "motorcycleFenceLeft";
				nextClass2 = "passengerleft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "right") {
				nextClass = "motorcycleFenceRight";
				nextClass2 = "passengerright";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "up") {
				nextClass = "motorcycleFenceUp";
				nextClass2 = "passengerup";
				nextLocation2 = nextLocation - widthOfBoard;
			} else if (direction == "down") {
				nextClass = "motorcycleFenceDown";
				nextClass2 = "passengerdown";
				nextLocation2 = nextLocation + widthOfBoard;
			}//else if

			//show horse jumping
			gridBoxes[nextLocation].className = nextClass;
			
			setTimeout(function() {
				
				//set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;
				
				//update current location of horse
				currentLocationOfMotorcycle = nextLocation2;
				
				//get class of box after jump
				nextClass = gridBoxes[currentLocationOfMotorcycle].className;
				
				//show horse after landing
	
				gridBoxes[currentLocationOfMotorcycle].className = nextClass2;
				
				//if next boc is flag
				levelUp(nextClass);

			}, 350);
			return;
		}//if passenger is on
		
	}//if class has fence
	
	//if next class has rider, pick up rider
	if (nextClass == "passenger") {
		passengerOn = true;
	}//if
	
	//if thre is a brigde in old location, keep it
	if (oldClassName.includes("bridge")) {
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	}//else
	
	//build name of new class
	newClass = (passengerOn) ? "passenger" : "motorcycle";
	newClass += direction;
	
	//if there is a bridge in next location keep it
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
		
	}//if
	
	//move one spaces
	currentLocationOfMotorcycle = nextLocation;
	gridBoxes[currentLocationOfMotorcycle].className = newClass;
	
	//if moved into enemy, end game
	if(nextClass.includes("enemy")) {
		document.getElementById("lose").style.display = "block";
		clearTimeout(currentAnimation);
		return;
	}

	//if moved into flag, moved up a level
	levelUp(nextClass);
	
}//tryToMove

//move up a level
function levelUp(nextClass) {
	
	console.log(levelCount);
	
	if(levelCount == 5){
			document.getElementById("win").style.display = "block";
			clearTimeout(currentAnimation);
			return;
		}
	
	if(nextClass == "flag" && passengerOn) {
	currentLevel++;
	
	if(levelCount == 4){
			document.getElementById("win").style.display = "block";
			return;
		}//if
		
		document.getElementById("levelup").style.display = "block";
		
		clearTimeout(currentAnimation);
		
		setTimeout(function(){
			document.getElementById("levelup").style.display = "none";
			loadLevel();
			levelCount++;
		}, 1000);
	}//if
	
}//levelUp

function loadIntro(){
	document.getElementById("title").style.display = "none";
	document.getElementById("two").style.display = "block";
}

function loadIntro1(){
	document.getElementById("two").style.display = "none";
	document.getElementById("three").style.display = "block";
}

function loadIntro2(){
	document.getElementById("three").style.display = "none";
	document.getElementById("four").style.display = "block";
}

function loadIntro3(){
	document.getElementById("four").style.display = "none";
	document.getElementById("five").style.display = "block";
}

function reload() {
	location.reload();
}//
