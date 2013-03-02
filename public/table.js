var Table = function(status) {
	Table._super.call(this);
	this.level = -1;
	this.opened = false;
	this.status = status;
	this.answers = null;
	this.penaltyBoxes = [];
	this._msTimerStart = 0;
	this._timer = 0;
	this._onTimer = JW.inScope(this._onTimer, this);
};

JW.extend(Table, JW.UI.Component, {
	/*
	Fields
	Integer level;
	Boolean opened;
	Array<Answer> answers;
	Array<PenaltyBox> penaltyBox;
	Integer _msTimerStart;
	Integer _timer;
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
		
		this._updateFaceText();
		
		this.penaltyBoxes[0].el.css("left", "29px");
		this.penaltyBoxes[1].el.css("left", "344px");
		
		this.answers = new JW.Array();
		for (var i = 0; i < DATA.answerCount; ++i) {
			this.answers.add(new Answer(i));
		}
		this.addArray(this.answers, "answers");
	},
	
	// override
	afterAppend: function() {
		this._rotate(0);
	},
	
	// override
	destroyComponent: function() {
		clearInterval(this._timer);
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
	},
	
	roll: function() {
		if (this._timer) {
			return;
		}
		this.opened = !this.opened;
		if (this.opened) {
			this.level = Math.min(DATA.answers.length - 1, this.level + 1);
			this._resetLevel();
		} else {
			this._updateFaceText();
		}
		this._msTimerStart = new Date().getTime();
		this._timer = setInterval(this._onTimer, 40);
	},
	
	_updateFaceText: function() {
		var text;
		switch (this.level) {
			case -1: text = "ПРОСТАЯ ИГРА"; break;
			case  0: text = "ДВОЙНАЯ ИГРА"; break;
			case  1: text = "ТРОЙНАЯ ИГРА"; break;
			case  2: text = "ИГРА НАОБОРОТ"; break;
			case  3: text = "БОЛЬШАЯ ИГРА"; break;
		}
		this.getElement("face-text").text(text);
	},
	
	_resetLevel: function() {
		this.answers.every(function(answer, index) {
			answer.reset(DATA.answers[this.level][index]);
		}, this);
		this.penaltyBoxes[0].reset();
		this.penaltyBoxes[1].reset();
	},
	
	_onTimer: function() {
		var factor = (new Date().getTime() - this._msTimerStart) / DATA.msTableRoll;
		if (factor >= 1) {
			factor = 1;
			clearInterval(this._timer);
			this._timer = 0;
		}
		this._rotate(factor + (this.opened ? 0 : 1));
	},
	
	// factor from 0 to 2
	_rotate: function(factor) {
		var ufactor = JW.mod(factor, 2);
		var sfactor = JW.smod(factor, 2);
		var radius = this.el.width() / 2;
		
		Util.setTransform(this.getElement("face"), "scaleX(" + Math.min(1, 0.005 + Math.cos(Math.PI * sfactor / 2)) + ")");
		Util.setTransform(this.getElement("back"), "scaleX(" + Math.min(1, 0.005 + Math.sin(Math.PI * ufactor / 2)) + ")");
		
		this.getElement("face-mask").css("opacity", .8 * (1 - Math.cos(Math.PI * sfactor / 2)));
		this.getElement("back-mask").css("opacity", .8 * (1 - Math.sin(Math.PI * ufactor / 2)));
		
		this.getElement("face").css("left", -(radius * Math.sin(Math.PI * sfactor / 2)) + "px");
		this.getElement("back").css("left", (radius * Math.cos(Math.PI * ufactor / 2)) + "px");
	}
});

JW.UI.template(Table, {
	main:
		'<div jwclass="table">' +
			'<div jwid="face">' +
				'<div jwid="face-text" />' +
				'<div jwid="face-mask" class="table-mask" />' +
			'</div>' +
			'<div jwid="back">' +
				'<div jwid="answers" />' +
				'<div jwid="level-box0" />' +
				'<div jwid="level-box1" />' +
				'<div jwid="penalty-box0" />' +
				'<div jwid="penalty-box1" />' +
				'<div jwid="back-mask" class="table-mask" />' +
			'</div>' +
		'</div>'
});
