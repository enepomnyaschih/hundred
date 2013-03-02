ScoreBox.Digit = function() {
	ScoreBox.Digit._super.call(this);
	this.value = null;
};

JW.extend(ScoreBox.Digit, JW.UI.Component, {
	setValue: function(value) {
		this.value = value;
		if (JW.isSet(value)) {
			Util.setBackgroundImage(this.el, "images/score-" + value + ".png");
		} else {
			this.el.css("background-image", "");
		}
	}
});

JW.UI.template(ScoreBox.Digit, {
	main: '<div jwclass="score-box-digit" />'
});
