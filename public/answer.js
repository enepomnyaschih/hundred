var Answer = function(index, answerData) {
	Answer._super.call(this);
	this.index = index;
	this.opened = false;
	this.answerData = answerData;
	this._msOpenStart = 0;
	this._timer = 0;
	this._onTimer = JW.inScope(this._onTimer, this);
};

JW.extend(Answer, JW.UI.Component, {
	/*
	Fields
	Integer index;
	Boolean opened;
	Object answerData;
	Integer _msOpenStart;
	Integer _timer;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this.el.css("top", (36 * this.index) + "px");
		Util.setBackgroundImage(this.getElement("number"), "images/number-" + (this.index + 1) + ".png");
		this.reset(this.answerData);
	},
	
	// override
	destroyComponent: function() {
		clearInterval(this._timer);
		this._super();
	},
	
	reset: function(answerData) {
		this.opened = false;
		this._finishAnimation();
		this.answerData = answerData;
		this.getElement("price").empty();
		this.getElement("text").empty();
		this.getElement("text").css("font-size", "");
	},
	
	open: function() {
		if (this.opened) {
			return 0;
		}
		this.opened = true;
		this.getElement("price").text(this.answerData.price);
		this.getElement("text").text(this.answerData.text);
		this.getElement("text").css("font-size", this.answerData.size ? (this.answerData.size + "px") : "");
		this._msOpenStart = new Date().getTime();
		this._timer = setInterval(this._onTimer, 40);
		trackAnswer.play();
		return this.answerData.price;
	},
	
	_onTimer: function() {
		var factor = (new Date().getTime() - this._msOpenStart) / DATA.msAnswerOpen;
		if (factor >= 1) {
			this._finishAnimation();
			return;
		}
		if (factor < .5) {
			this.getElement("face").css("display", "");
			this.getElement("back").css("display", "none");
			factor = 1 - 2 * factor;
		} else {
			this.getElement("face").css("display", "none");
			this.getElement("back").css("display", "");
			factor = 2 * factor - 1;
		}
		factor = Math.sin(Math.PI * factor / 2);
		Util.setTransform(this.el, "scaleY(" + factor + ")");
	},
	
	_finishAnimation: function() {
		clearInterval(this._timer);
		this._timer = 0;
		this.getElement("face").css("display", this.opened ? "none" : "");
		this.getElement("back").css("display", this.opened ? "" : "none");
		Util.setTransform(this.el, "");
	}
});

JW.UI.template(Answer, {
	main:
		'<div jwclass="answer">' +
			'<div jwid="face">' +
				'<div jwid="number" />' +
			'</div>' +
			'<div jwid="back">' +
				'<div jwid="price" />' +
				'<div jwid="text" />' +
			'</div>' +
		'</div>'
});
