var Table = function(level) {
	Table._super.call(this);
	this.level = level;
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
		
		var imageUrl = "images/level-" + Math.min(4, this.level + 1) + ".png";
		Util.setBackgroundImage(this.getElement("level-box0"), imageUrl);
		Util.setBackgroundImage(this.getElement("level-box1"), imageUrl);
		
		this.penaltyBoxes[0].el.css("left", "29px");
		this.penaltyBoxes[1].el.css("left", "344px");
		
		this.answers = new JW.Array();
		for (var i = 0; i < DATA.answerCount; ++i) {
			this.answers.add(new Answer(i, DATA.answers[this.level][i]));
		}
		this.addArray(this.answers, "answers");
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
		var price = this.answers.get(index).open();
		if (this.level < 3) {
			price *= (this.level + 1);
		}
		return price;
	}
});

JW.UI.template(Table, {
	main:
		'<div jwclass="table">' +
			'<div jwid="answers" />' +
			'<div jwid="level-box0" class="table-level-box" />' +
			'<div jwid="level-box1" class="table-level-box" />' +
			'<div jwid="penalty-box0" />' +
			'<div jwid="penalty-box1" />' +
		'</div>'
});
