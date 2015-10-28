$.getJSON("https://api.github.com/repos/kvnneff/bloxparty/releases").done(function (json) {
	var assets = json[0].assets;
	for(var i = assets.length - 1; i >= 0; i--) {
		var tagStart = assets[i].name.substring(0).search(/(darwin|linux|win32)/);
		var tag = assets[i].name.substring(tagStart, assets[i].name.indexOf('.'));
		
		console.log(tag);
		$("#" + tag).attr("href", assets[i].browser_download_url);
	}
});