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
			squaresArray[j].classList.add(array[i].name, 'unavailable');
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

function checkMovementNumbers($this){
	console.log('$this',$this)
	let currentPosition = activePlayer.position	
	console.log('currentPosition',typeof currentPosition.playerRow)
	console.log('typeof $this[0].dataset.row',typeof $this[0].dataset.row)
	// let currenPositionRow = currenPosition.playerRow
	// let currentPositionCol = currentPosition.PlayerCol
	if(currentPosition.playerRow == $this[0].dataset.row){
	// console.log('currentPosition.playerRow === $this[0].dataset.row', typeof currentPosition.playerRow === $this[0].dataset.row)
		let differentCols =  parseInt(currentPosition.playerCol) -  parseInt($this[0].dataset.col)
		// console.log(differentCols)
		// console.log(' parseInt(currentPosition.playerCol)',parseInt(currentPosition.playerCol))
		// console.log(' parseInt($this[0].dataset.col)', parseInt($this[0].dataset.col))
		if(Math.abs(differentCols) <= 3 ){
			// console.log('Math.abs(differentCols) <= 3 ',Math.abs(differentCols) <= 3 )
			// console.log('aloud the player to move')
			return true
		}else{
			console.log('dont move more than three squares')
			return false
		}
	}
	if(currentPosition.playerCol == $this[0].dataset.col){
		 console.log('currentPosition.playerCol == $this[0].dataset.col',currentPosition.playerCol == $this[0].dataset.col)
		let differentRows = parseInt(currentPosition.playerRow) - parseInt($this[0].dataset.row)
		if(Math.abs(differentRows) <= 3){
			// console.log('aloud the player to move')
			return true
		}else{
			console.log('dont move than three squares')
			return false
		}
	}
}

function barrierCheck($this){
	
	let playerCurrentCol = activePlayer.position.playerCol
	let playerCurrentRow = activePlayer.position.playerRow
	let clickSquareColum = $this[0].dataset.col
	let clickSquareRow = $this[0].dataset.row	
	// 1 iterate over the squares between the current position and the click square 
  for(let i = Math.min(playerCurrentCol,clickSquareColum); i <= Math.max(playerCurrentCol,clickSquareColum); i++){
		// 2 check the if the square has a class of barrier 
	if(($this).hasClass('unavailable')){
			
	//  3.a if it have a class of barrier return false
	   return false
	 }else{		 
	//   3.b if it have not return true 
	   return true
	  }
	}

   for(let i = Math.min(playerCurrentRow,clickSquareRow); i<= Math.max(playerCurrentRow,clickSquareRow); i++){
	  if(($this).hasClass('unavailable')){
		return false
	  }else{
		return true 
	  }
    }

}



function movePlayer($this){
	// console.log('$this',$this)
	let canPlayerMove = checkMovementNumbers($this)
	console.log('canPlayerMove',canPlayerMove)
	let barrierCheck = true
	if(canPlayerMove && barrierCheck){
		$this.addClass(activePlayer.name).addClass('unavailable')
		$(`[data-row=${activePlayer.position.playerRow}][data-col=${activePlayer.position.playerCol}]`).removeClass(activePlayer.name).removeClass('unavailable');
		activePlayer.position.playerRow = $this.attr('data-row')
		activePlayer.position.playerCol = $this.attr('data-col')
		pickUpWeapon($this)
	}else{
		console.log('player cant move')
	}
	
}

 //define function
function activateBarriers(tempArray,$this){
	// console.log('$this',$this)
	//  1. Select the square where the player move 
	let newPlayerPos = $this;
	//console.log(newPlayerPos)
	// 2. Check if the square has the class of unavailable 
	let isNotAvalaible = newPlayerPos.hasClass('unavailable')
	if (isNotAvalaible) {
	// 3. If it does then don't aloud the player to go through
		//console.log('is not  available') 
		alert('you cant move there, choose another square')
	}else{
	// 4. If it doesn't then the player can move normal
		//console.log('available')
		movePlayer(tempArray,$this);
			
	 }
}

function bringWeaponsInfo(weapon){
	console.log('weapon',weapon)
	for(let i = 0; i < weaponsArray.length; i++){
		console.log(weaponsArray[i].name)
		if(weaponsArray[i].name === weapon){
			return i
		}
	}
}

function pickUpWeapon($this){
	// console.log('$this',$this)
	// 2.it the square selected has class of weapon 
	let hasWeapon = $this.hasClass('sword')||  $this.hasClass('bomb1') ||  $this.hasClass('bomb2') ||  $this.hasClass('dynamite')
	//console.log(hasWeapon)
	if(hasWeapon) { 
		//console.log('has a weapon ')
		let currentWeapon = activePlayer.weapon.name 
		//console.log(currentWeapon)
		let clickWeapon = $this.attr('class').substr(10)
		//console.log('clickweapon', clickWeapon)
		let weaponIndex = bringWeaponsInfo(clickWeapon)
		//console.log(weaponIndex)
		reassignWeapon(weaponIndex)	
		dropOldWeapon(currentWeapon,$this,weaponIndex)
	} 
}

function reassignWeapon(weaponIndex){
	// let currentWeapon = activePlayer.weapon.name
	// let  clickWeapon = weaponsArray[weaponIndex].name
	activePlayer.weapon.name = weaponsArray[weaponIndex].name
	activePlayer.weapon.power = weaponsArray[weaponIndex].power
	activePlayer.weapon.img = weaponsArray[weaponIndex].img
	console.log(activePlayer)
}

function dropOldWeapon(currentWeapon,$this,weaponIndex){
    $this.addClass(currentWeapon)
    $this.removeClass( weaponsArray[weaponIndex].name)
}



	// 3. get the player current position from player object in player array *
    // 4. get player new position from players click *
    // 5. check where the  player is moving and when is in colums or rows *
		//   5.a  if player moving along colums 
             //5.a.a checkplayer yCoor currentPos they are and yCoords newPos they want to move
    // 6.write the condition for if the player clicked less then three squares         
	// 6.a aloud the player to move 
	//7. write the condition for  if the player clicked more then three squares  
      //7.a show the player an alert where it says you cannot move more then three squares
      	// 5.b if players moving along rows 
      	// 5.b.b checkplayer yCoor currentPos they are and yCoords newPos they want to move 
   //      6.write the condition for if the player clicked less then three squares
   	//        6.a aloud the player to move 
   	   	//      7. write the condition for  if the player clicked more then three squares 
   	//       7.a show the player an alert where it says you cannot move more then three squares

generateBarriers()
createItems(weaponsArray)
createItems(playersArray)