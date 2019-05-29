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
		let randomX = generateRandomlyNumber();
		let randomY = generateRandomlyNumber();
		for(let j = 0; j < squaresArray.length; j++ ){
			let statusX = parseInt(squaresArray[j].dataset.row)=== randomX;
			let statusY = parseInt(squaresArray[j].dataset.col)=== randomY;
			if (statusX && statusY ){
				squaresArray[j].classList.add('unavailable');
			}

		}
	}
}

generateBarriers()