var shape = 0;
var c = require('color');
var canvas;
var ctx;

$(document).ready(function() {
	canvas = document.getElementById('blockGenerator');
	ctx = canvas.getContext('2d');
	updateBlock();
	setInterval(updateBlock, 1000);
	
	$.getJSON("https://api.github.com/repos/kvnneff/bloxparty/releases").done(function (json) {
		var assets = json[0].assets;
		var clientOS = detectOS();
		for(var i = assets.length - 1; i >= 0; i--) {
			if(assets[i].name.indexOf(clientOS) > -1) {
				$("#download").attr("href", assets[i].browser_download_url);
			}
		}
	});
});

function updateBlock() {
	drawBlock(shapes[shape]);
	shape++;
	if(shape === shapes.length) {
		shape = 0;
	}
}

function drawBlock(block) {
	var rotation = block.rotations[Math.floor(Math.random() * 4)];
	const cellWidth = 19;
	const cellHeight = 19;
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	for(var i = rotation.length - 1; i >= 0; i--) {
		for(var j = rotation[i].length - 1; j >= 0; j--) {
			if(rotation[i][j] === 1) {
				ctx.fillStyle = block.color;
				
				var cellX = i * 20;
				var cellY = j * 20;
				var bevelWidth = cellWidth * 0.1
				var innerX = cellX + (cellWidth * 0.1)
				var innerY = cellY + (cellHeight * 0.1)
				var innerWidth = cellWidth - (cellWidth * 0.1) * 2
				var innerHeight = cellWidth - (cellHeight * 0.1) * 2
				var topLeftColor = c(block.color).lighten(0.6).rgbString()
				var bottomRightColor = c(block.color).darken(0.5).rgbString()
				
				ctx.fillRect(innerX, innerY, innerWidth, innerHeight)

				ctx.fillStyle = topLeftColor
				ctx.beginPath()
				ctx.moveTo(cellX, cellY)
				ctx.lineTo(cellX + cellWidth, cellY)
				ctx.lineTo(cellX + cellWidth - bevelWidth, cellY + bevelWidth)
				ctx.lineTo(cellX + bevelWidth, cellY + bevelWidth)
				ctx.lineTo(cellX + bevelWidth, cellY + cellHeight - bevelWidth)
				ctx.lineTo(cellX, cellY + cellHeight)
				ctx.closePath()
				ctx.fill()

				ctx.fillStyle = bottomRightColor
				ctx.beginPath()
				ctx.moveTo(cellX + cellWidth, cellY)
				ctx.lineTo(cellX + cellWidth, cellY + cellHeight)
				ctx.lineTo(cellX, cellY + cellHeight)
				ctx.lineTo(cellX + bevelWidth, cellY + cellHeight - bevelWidth)
				ctx.lineTo(cellX + cellWidth - bevelWidth, cellY + cellHeight - bevelWidth)
				ctx.lineTo(cellX + cellWidth - bevelWidth, cellY + bevelWidth)
				ctx.closePath()
				ctx.fill()
			}
		}
	}
}

function detectOS() {
	if(navigator.appVersion.indexOf('Win') != -1) {
		return 'win32'
	} else if(navigator.appVersion.indexOf('Mac') != -1) {
		return 'darwin'
	} else if(navigator.appVersion.indexOf('X11') != -1
			  || navigator.appVersion.indexOf('Linux') != -1) {
		return 'linux'
	}
}