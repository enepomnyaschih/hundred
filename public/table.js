var Table = function(answers) {
	Table._super.call(this);
	this.answers = answers;
	this.answerViews = null;
	this.total = null;
	this._onKeyDown = JW.inScope(this._onKeyDown, this);
};

JW.extend(Table, JW.UI.Component, {
	/*
	Fields
	Array<Object> answers;
	Array<Answer> answerViews;
	Total total;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		
		this.answerViews = JW.Array.map(this.answers, function(answer, index) {
			return new Answer(answer.text, answer.price, index);
		}, this);
		this.addArray(this.answerViews, "answers");
		
		JW.UI.windowEl.keydown(this._onKeyDown);
	},
	
	renderLeftMistakeBox: function() {
		return new MistakeBox(188);
	},
	
	renderRightMistakeBox: function() {
		return new MistakeBox(190);
	},
	
	_onKeyDown: function(event) {
		var index = event.charCode - ("0").charCodeAt(0) - 1; // -1 because arrays starts from 0 instead of 1
		if ((index >= 0) && (index < this.answerViews.length)) {
			event.preventDefault();
			var answerView = this.answerViews[index];
			if (answerView.revealed) {
				return;
			}
			answerView.reveal();
			this.total.add(answerView.price);
		}
	}
});

JW.UI.template(Table, {
	main:
		'<div jwclass="table">' +
			'<div jwid="answers" />' +
			'<div jwid="left-mistake-box" />' +
			'<div jwid="right-mistake-box" />' +
		'</div>'
});
