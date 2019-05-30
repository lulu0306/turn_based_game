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
	for(let i =0; i < 9; i++){
		let vector = {
			randomX: generateRandomlyNumber(),
			randomY: generateRandomlyNumber()
		}

		for(let j = 0; j < squaresArray.length; j++ ){
			let statusX = parseInt(squaresArray[j].dataset.row)=== vector.randomX;
			let statusY = parseInt(squaresArray[j].dataset.col)=== vector.randomY;
			if (statusX && statusY ){
				squaresArray[j].classList.add('unavailable');
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
	img: ''
},
{
	name: 'player2',
	healthScore: 100,
	img: ''
}
]


function createItems(array){
for(let i = 0; i < array.length; i++){
		let vector = {
			randomX: generateRandomlyNumber(),
			randomY: generateRandomlyNumber()
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

$('.grid-container').on('click','.grid-item', function(){
	console.log('square click :', $(this)[0].attribute[1].value);
});

generateBarriers()
createItems(weaponsArray)
createItems(playersArray)
