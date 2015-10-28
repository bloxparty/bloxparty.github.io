var shape = 0;
var canvas;
var ctx;

window.onload = function() {
	canvas = document.getElementById('blockGenerator');
	ctx = canvas.getContext('2d');
	setInterval(updateBlock, 1000);
}

function updateBlock() {
	drawBlock(shapes[shape]);
	shape++;
	if(shape === shapes.length) {
		shape = 0;
	}
}

function drawBlock(block) {
	var rotation = block.rotations[Math.floor(Math.random() * 4)];
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = block.color;
	
	for(var i = rotation.length - 1; i >= 0; i--) {
		for(var j = rotation[i].length - 1; j >= 0; j--) {
			console.log(j)
			if(rotation[i][j] === 1) {
				ctx.fillRect(i * 20, j * 20, 19, 19);
			}
		}
	}
}