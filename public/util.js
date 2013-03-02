var Util = {
	setBackgroundImage: function(el, url) {
		el.css("background-image", "url(" + url + ")");
	},
	
	setTransform: function(el, transform) {
		el.css({
			"transform"         : transform,
			"-webkit-transform" : transform,
			"-moz-transform"    : transform
		});
	}
};
