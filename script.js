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
		console.log('isAvalaible',isAvalaible)
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
		name: 'dinamite',
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
			playerX: '',
			playerY: ''
		}
	},
	{
		name: 'player2',
		healthScore: 100,
		img: '',
		position: {
			playerX: '',
			playerY: ''
		}
	}
]


function createItems(array){
	console.log('array',array)
	for(let i = 0; i < array.length; i++){
		let vector = {
			randomX: generateRandomlyNumber(),
			randomY: generateRandomlyNumber()
		}

		if (array === playersArray) {
			array[i].position.playerX = vector.randomX;
			array[i].position.playerY = vector.randomY;
			console.log(array[i].position)
		}

		for(let j = 0; j < squaresArray.length; j++ ){
			let statusX = parseInt(squaresArray[j].dataset.row)=== vector.randomX;
			let statusY = parseInt(squaresArray[j].dataset.col)=== vector.randomY;
			if (statusX && statusY ){
				squaresArray[j].classList.add(array[i].name,'unavailable');
			}

		}

	}

}


/*function checkAvaliablility(vector){

if () {}

}*/


let activePlayer = playersArray[0];


$('.grid-container').on('click','.grid-item', function(){
	let squareX = $(this)[0].attributes[1].value;
	let squareY = $(this)[0].attributes[2].value;
	let playerX = activePlayer.position.playerX;
	let playerY = activePlayer.position.playerY;

	console.log('square click :', squareX,squareY);
	console.log('playerX , playerY', playerX, playerY);

	let xDiff = squareX - playerX;
	let yDiff = squareY - playerY;

	let tempArray = [];
	if (xDiff === 0) {
		console.log('moving along y')
		if(yDiff > 0) {
			console.log('moving to the right')
			for(let i = 1; i < yDiff +1; i++){
				let tempObj = {tempX: playerX, tempY: playerY+ i}
				console.log('tempObj',tempObj)
				tempArray.push(tempObj)
				console.log('tempArray',tempArray)
			}

		}else if (yDiff < 0){
			console.log('moving to the left')
			for(let i = 1; i < yDiff; i++){
				let tempObj = {tempX: playerX, tempY: playerY- i}
				console.log('tempObj',tempObj)
				tempArray.push(tempObj)
				console.log('tempArray',tempArray)
			}
		
		}
	}else if(xDiff> 0){
		console.log('moving along down')
		for(let i = 1; i < xDiff +1; i ++){
			let tempObj = {tempX: playerX + i, tempY: playerY}
			console.log('tempObj',tempObj)
			tempArray.push(tempObj)
			console.log('tempArray',tempArray)
		}
	}else{
		console.log('moving to up')
		for(let i = 1; i < yDiff; i++){
			let tempObj = {tempX: playerX - i, tempY: playerY}
			console.log('tempObj',tempObj)
			tempArray.push(tempObj)
			console.log('tempArray',tempArray)
		}
	}

});


function down(){
	
	let xDiff = squareX - playerX;
	let yDiff = squareY - playerY;
	let playerX = activePlayer.position.playerX;
	let playerY = activePlayer.position.playerY;
	if(xDiff>0){
		tempObj= {tempX: playerX + i, tempY: playerY}
		if(square === isAvaliable){
			square = PlayerX
		}
	}
}



generateBarriers()
createItems(weaponsArray)
createItems(playersArray)
down()

