var Application = function() {
	Application._super.call(this);
	this.scoreData = new ScoreData();
	this.table = null;
	this.bank = null;
	this.scores = [];
	this._lastKeyCode = null;
	this._lastPrice = 0;
	this._onKeyDown = JW.inScope(this._onKeyDown, this);
};

JW.extend(Application, JW.UI.Component, {
	/*
	Fields
	ScoreData scoreData;
	Table table;
	BankBox bank;
	Array<ScoreBox> scores;
	Integer _lastKeyCode;
	Integer _lastPrice;
	*/
	
	renderTable: function() {
		return this.table = new Table();
	},
	
	renderBank: function() {
		return this.bank = new BankBox(this.scoreData);
	},
	
	renderScore0: function() {
		return this.scores[0] = new TeamScoreBox(this.scoreData, 0);
	},
	
	renderScore1: function() {
		return this.scores[1] = new TeamScoreBox(this.scoreData, 1);
	},
	
	// override
	renderComponent: function() {
		this._super();
		this.bank.el.css("left", "328px");
		this.bank.el.css("top", "25px");
		this.scores[0].el.css("left", "14px");
		this.scores[0].el.css("top", "213px");
		this.scores[1].el.css("left", "642px");
		this.scores[1].el.css("top", "213px");
		JW.UI.windowEl.bind("keydown", this._onKeyDown);
	},
	
	// override
	destroyComponent: function() {
		JW.UI.windowEl.unbind("keydown", this._onKeyDown);
		this._super();
	},
	
	_onKeyDown: function(event) {
		if (!Application.reservedKeys[event.keyCode]) {
			return;
		}
		event.preventDefault();
		if (this._lastKeyCode !== event.keyCode) {
			this._lastKeyCode = event.keyCode;
			return;
		}
		this._lastKeyCode = null;
		switch (event.keyCode) {
			case 90: this.table.addPenalty(0); break;
			case 88: this.table.addPenalty(1); break;
			case 188: this.scoreData.pullBank(0); break;
			case 190: this.scoreData.pullBank(1); break;
			case 32: this.table.roll(); break;
			case 187:
			case 107:
				this.scoreData.increaseBank(this._lastPrice);
				this._lastPrice = 0;
				break;
			default:
				var index = event.keyCode - 97;
				if ((index < 0) || (index >= 6)) {
					index = event.keyCode - 49;
				}
				if ((index < 0) || (index >= 6)) {
					break;
				}
				this._lastPrice = this.table.openAnswer(index);
				break;
		}
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div jwid="table" />' +
			'<div jwid="bank" />' +
			'<div jwid="score0" />' +
			'<div jwid="score1" />' +
		'</div>'
});

Application.reservedKeys = JW.Array.indexBy([
	97, 98, 99, 100, 101, 102, // Numbers from 1 to 6 (num keyboard)
	49, 50, 51, 52, 53, 54, // Numbers from 1 to 6 (usual keyboard)
	187, // +
	107, // num +
	90,  // z
	88,  // x
	188, // <
	190, // >
	32   // space
]);
