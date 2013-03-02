var ScoreBox = function() {
	ScoreBox._super.call(this);
	this.value = 0;
	this._digits = null;
};

JW.extend(ScoreBox, JW.UI.Component, {
	/*
	Fields
	Integer value;
	Array<ScoreBox.Digit> _digits;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this._digits = new JW.Array();
		for (var i = 0; i < 3; ++i) {
			var digit = new ScoreBox.Digit();
			digit.render();
			digit.el.css("left", (35 * (2 - i)) + "px");
			this._digits.add(digit);
		}
		this.addArray(this._digits);
		this._redraw();
	},
	
	// override
	destroyComponent: function() {
		this._digits.eachByMethod("destroy");
		this._super();
	},
	
	setValue: function(value) {
		this.value = value;
		this._redraw();
	},
	
	_redraw: function() {
		var value = (this.value >= 1000) ? 999 : this.value;
		this._digits.get(0).setValue(value % 10);
		
		value = Math.floor(value / 10);
		this._digits.get(1).setValue(value ? (value % 10) : null);
		
		value = Math.floor(value / 10);
		this._digits.get(2).setValue(value ? (value % 10) : null);
	}
});

JW.UI.template(ScoreBox, {
	main: '<div jwclass="score-box" />'
});
