var shape = 0;
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
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = block.color;
	
	for(var i = rotation.length - 1; i >= 0; i--) {
		for(var j = rotation[i].length - 1; j >= 0; j--) {
			if(rotation[i][j] === 1) {
				ctx.fillRect(i * 20, j * 20, 19, 19);
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