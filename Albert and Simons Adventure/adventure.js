const levels = [  
	
	 //level 0
   ["flag", "rock", "", "", "",
   "fenceSide", "rock", "", "", "passenger",
   "", "tree", "animate", "animate", "animate",
   "","water","","", "",
   "", "fenceUp", "", "motorcycleUp", ""]

	//level 1 
   
   ];
   
window.addEventListener("load", function () {
	loadLevel();
});
 
var currentLevel = 0;
var passengerOn = false;
var currentLocationOfMotorcycle = 0;
var currentAnimation; //allows one animation per level

const gridBoxes = document.querySelectorAll("#gameBoard div") 

//load levels 0 - max
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	passengerOn = false;
	
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
		//turn arounf if hit left side
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