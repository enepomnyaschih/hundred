var Table = function(status) {
	Table._super.call(this);
	this.level = 0;
	this.status = status;
	this.answers = null;
	this.penaltyBoxes = [];
};

JW.extend(Table, JW.UI.Component, {
	/*
	Fields
	Integer level;
	Array<Answer> answers;
	Array<PenaltyBox> penaltyBox;
	*/
	
	renderPenaltyBox0: function() {
		return this.penaltyBoxes[0] = new PenaltyBox();
	},
	
	renderPenaltyBox1: function() {
		return this.penaltyBoxes[1] = new PenaltyBox();
	},
	
	// override
	renderComponent: function() {
		this._super();
		
		this.penaltyBoxes[0].el.css("left", "29px");
		this.penaltyBoxes[1].el.css("left", "344px");
		
		this.answers = new JW.Array();
		for (var i = 0; i < DATA.answerCount; ++i) {
			this.answers.add(new Answer(i));
		}
		this.addArray(this.answers, "answers");
		
		this._resetLevel();
	},
	
	// override
	destroyComponent: function() {
		this.answers.eachByMethod("destroy");
		this._super();
	},
	
	addPenalty: function(team) {
		this.penaltyBoxes[team].addPenalty();
	},
	
	openAnswer: function(index) {
		return this.answers.get(index).open();
	},
	
	roll: function() {
	},
	
	_resetLevel: function() {
		this.answers.every(function(answer, index) {
			answer.reset(DATA.answers[this.level][index]);
		}, this);
		this.penaltyBoxes[0].reset();
		this.penaltyBoxes[1].reset();
	}
});

JW.UI.template(Table, {
	main:
		'<div jwclass="table">' +
			'<div jwid="answers" />' +
			'<div jwid="level-box0" />' +
			'<div jwid="level-box1" />' +
			'<div jwid="penalty-box0" />' +
			'<div jwid="penalty-box1" />' +
		'</div>'
});
