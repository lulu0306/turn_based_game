//create a 10 by 10 board square

let square;
for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 10; j++) {
		square = `<div class="grid-item" data-row=${i} data-col=${j}>${i},${j}</div>`
		$('.grid-container').append(square)	
	}
}
//create an array of grid-item div

const squaresArray = $('.grid-item').toArray()




//create unavalaible squares on the map 

function generateRandomlyNumber(){
	return Math.floor(Math.random()*10)
}

//declare an unavailable squares

function generateBarriers(){
	let vector;
	for(let i =0; i < 9; i++){
		vector = {
			randomX: generateRandomlyNumber(),
			randomY: generateRandomlyNumber()
		}
		const isAvalaible = $(`[data-row=${vector.randomX}][data-col=${vector.randomY}]`).hasClass('unavailable')
		//console.log('isAvalaible',isAvalaible)
		if(!isAvalaible){
			vector = {
				randomX: generateRandomlyNumber(),
				randomY: generateRandomlyNumber()
			}
		}

			for(let j = 0; j < squaresArray.length; j++ ){
				let statusX = parseInt(squaresArray[j].dataset.row)=== vector.randomX;
				let statusY = parseInt(squaresArray[j].dataset.col)=== vector.randomY;
				if (statusX && statusY ){
					squaresArray[j].classList.add('barrier','unavailable');
				}

			}

	}
}



//create weapons 



let weaponsArray = [
	{
		name: 'sword',
		power: 40,
		img: ''
	},
	{
		name: 'bomb1',
		power: 30,
		img: ''
	},
	{
		name: 'bomb2',
		power: 20,
		img: ''
	},
	{
		name: 'dynamite',
		power: 10,
		img: ''
	}
]




const playersArray = [
	{
		name: 'player1',
		healthScore: 100,
		img: '',
		position: {
			playerRow: '',
			playerCol: ''
		},
		weapon:{
			name: 'sword',
			power: 40,
			img: ''
	    }
	},
	{
		name: 'player2',
		healthScore: 100,
		img: '',
		position: {
			playerRow: '',
			playerCol: ''
		},
		weapon:{
			name: 'sword',
			power: 40,
			img: ''
	    }
	}
]


function createItems(array){
	//console.log('array',array)
	for(let i = 0; i < array.length; i++){
		let vector = {
			randomX: generateRandomlyNumber(),
			randomY: generateRandomlyNumber()
		}

		if (array === playersArray) {
			array[i].position.playerRow = vector.randomX;
			array[i].position.playerCol = vector.randomY;
			//console.log(array[i].position
			squaresArray[j].classList.add(array[i].name,'unavailable');
			}

		for(let j = 0; j < squaresArray.length; j++ ){
			let statusX = parseInt(squaresArray[j].dataset.row)=== vector.randomX;
			let statusY = parseInt(squaresArray[j].dataset.col)=== vector.randomY;
			if (statusX && statusY ){
				squaresArray[j].classList.add(array[i].name);
			}

		}

	}

}


/*function checkAvaliablility(vector){

if () {}

}*/


let activePlayer = playersArray[0];


$('.grid-container').on('click','.grid-item', function(){
	let $this = $(this)
	let this2 = this
	//console.log('$this,this',$this,this2)
	let squareX = $(this)[0].attributes[1].value;
	let squareY = $(this)[0].attributes[2].value;
	let playerRow = activePlayer.position.playerRow;
	let playerCol = activePlayer.position.playerCol;

	//console.log('square click :', squareX,squareY);
	//console.log('playerRow , playerCol', playerRow, playerCol);

	let xDiff = squareX - playerRow;
	let yDiff = squareY - playerCol;

	let tempArray = [];
	if (xDiff === 0) {
		//console.log('moving along y')
		if(yDiff > 0) {
			//console.log('moving to the right')
			for(let i = 1; i < yDiff +1; i++){
				let tempObj = {tempX: playerRow, tempY: playerCol+ i}
				//console.log('tempObj',tempObj)
				tempArray.push(tempObj)
				//console.log('tempArray',tempArray)
			}

		}else if (yDiff < 0){
			//console.log('moving to the left')
			for(let i = 1; i < yDiff; i++){
				let tempObj = {tempX: playerRow, tempY: playerCol- i}
				//console.log('tempObj',tempObj)
				tempArray.push(tempObj)
				//console.log('tempArray',tempArray)
			}
		
		}
	}else if(xDiff> 0){
		////console.log('moving along down')
		for(let i = 1; i < xDiff +1; i ++){
			let tempObj = {tempX: playerRow + i, tempY: playerCol}
			//console.log('tempObj',tempObj)
			tempArray.push(tempObj)
			//console.log('tempArray',tempArray)
		}
	}else{
		//console.log('moving to up')
		for(let i = 1; i < yDiff; i++){
			let tempObj = {tempX: playerRow - i, tempY: playerCol}
			//console.log('tempObj',tempObj)
			tempArray.push(tempObj)
			//console.log('tempArray',tempArray)
		}
	}
		activateBarriers(tempArray,$this)	
});





function movePlayer(tempArray,$this){
	pickUpWeapon($this)
	////console.log('tempArray,$this,this2',tempArray,$this,this2);
	$this.addClass(activePlayer.name).addClass('unavailable')
	$(`[data-row=${activePlayer.position.playerRow}][data-col=${activePlayer.position.playerCol}]`).removeClass(activePlayer.name).removeClass('unavailable');
	////console.log('player before',activePlayer.position)
	activePlayer.position.playerRow = $this.attr('data-row')
	////console.log("$this.attr('data-row')",$this.attr('data-row'))
	activePlayer.position.playerCol = $this.attr('data-col')
	////console.log('player after',activePlayer.position)
}


 //define function
function activateBarriers(tempArray,$this){
	//  1. Select the square where the player move 
	let newPlayerPos = $this;
	console.log(newPlayerPos)
	// 2. Check if the square has the class of unavailable 
	let isNotAvalaible = newPlayerPos.hasClass('unavailable')
	if (isNotAvalaible) {
	// 3. If it does then don't aloud the player to go through
		//console.log('is not  available') 
		alert('you cant move there, choose another square')
	}else{
	// 4. If it doesn't then the player can move normal
		//console.log('available')
		movePlayer(tempArray,$this)
		pickUpWeapon($this)
	}
}

function pickUpWeapon($this){
	// 2.it the square selected has class of weapon 
	let hasWeapon = $this.hasClass('sword')||  $this.hasClass('bomb1') ||  $this.hasClass('bomb2') ||  $this.hasClass('dynamite')
	let currentWeapon = playersArray[0].weapon.name 
	console.log(currentWeapon)
	if(hasWeapon) {
		console.log('has a weapon ')
		// 3.leave old weapon

		// 4.the weapon is replaced with a new weapon
	}else{
		console.log('no weapon ')

	}

 

}










generateBarriers()
createItems(weaponsArray)
createItems(playersArray)


