//create a 10 by 10 board square

let square;
for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 10; j++) {
	square = `<div class="grid-item" data-row=${i} data-col=${j}>${i},${j}</div>`
	$('.grid-container').append(square)	
	}
}

//create unavalaible squares on the map 

//randomly select number 


function generateRandomlyNumber(){

return Math.floor(Math.random()*10)


}

let randomX = generateRandomlyNumber();
let randomY = generateRandomlyNumber();

console.log('randomX randomY', randomX, randomY );