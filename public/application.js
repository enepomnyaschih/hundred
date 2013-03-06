var Application = function() {
	Application._super.call(this);
	this.scoreData = new ScoreData();
	this.roller = null;
	this.bank = null;
	this.scores = [];
	this._lastKeyCode = null;
	this._lastPrice = 0;
	this._timerView = null;
	this._timerPlayback = null;
	this._timerTimeout = 0;
	this._onKeyDown = JW.inScope(this._onKeyDown, this);
};

JW.extend(Application, JW.UI.Component, {
	/*
	Fields
	ScoreData scoreData;
	Roller roller;
	BankBox bank;
	Array<ScoreBox> scores;
	Integer _lastKeyCode;
	Integer _lastPrice;
	TimerView _timerView;
	JW.Audio.Playback _timerPlayback;
	Integer _timerTimeout;
	*/
	
	renderRoller: function() {
		return this.roller = new Roller(this.scoreData);
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
		if (event.target.tagName.toLowerCase() === "input") {
			return;
		}
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
			case 90: if (this.roller.table) this.roller.table.addPenalty(0); break;
			case 88: if (this.roller.table) this.roller.table.addPenalty(1); break;
			case 67: trackPenalty.play(); break;
			case 188: this.scoreData.pullBank(0); trackScores.play(); break;
			case 190: this.scoreData.pullBank(1); trackScores.play(); break;
			case 32: this.roller.roll(); break;
			case 220: trackRepeat.play(); break;
			case 65: this._toggleTimer(25000); break;
			case 83: this._toggleTimer(30000); break;
			case 187:
			case 107:
				this.scoreData.increaseBank(this._lastPrice);
				this._lastPrice = 0;
				break;
			default:
				if (!this.roller.table) {
					break;
				}
				var index = event.keyCode - 97;
				if ((index < 0) || (index >= 6)) {
					index = event.keyCode - 49;
				}
				if ((index < 0) || (index >= 6)) {
					break;
				}
				this._lastPrice = this.roller.table.openAnswer(index);
				break;
		}
	},
	
	_toggleTimer: function(ms) {
		if (this._timerView) {
			this._doneTimer(true);
			return;
		}
		this._timerView = new TimerView(ms, -1);
		this._timerView.expireEvent.bind(this._doneTimer, this);
		this.children.set(this._timerView, "timer");
		this._timerView.resume();
		this._timerPlayback = trackTimer20.play();
		this._timerTimeout = setTimeout(JW.inScope(this._onTimerRestart, this), ms - 20500);
	},
	
	_doneTimer: function(killPlayback) {
		if (!this._timerView) {
			return;
		}
		this.children.remove("timer").destroy();
		if (killPlayback === true) {
			this._timerPlayback.destroy();
		}
		clearTimeout(this._timerTimeout);
		this._timerView = null;
		this._timerPlayback = null;
		this._timerTimeout = 0;
	},
	
	_onTimerRestart: function() {
		if (!this._timerPlayback) {
			return;
		}
		this._timerPlayback.destroy();
		this._timerPlayback = trackTimer20.play();
		this._timerTimeout = 0;
	}
});

JW.UI.template(Application, {
	main:
		'<div jwclass="application">' +
			'<div jwid="roller" />' +
			'<div jwid="bank" />' +
			'<div jwid="score0" />' +
			'<div jwid="score1" />' +
			'<div jwid="timer" />' +
		'</div>'
});

Application.reservedKeys = JW.Array.indexBy([
	97, 98, 99, 100, 101, 102, // Numbers from 1 to 6 (num keyboard) - open answer
	49, 50, 51, 52, 53, 54, // Numbers from 1 to 6 (usual keyboard) - open answer
	187, // + - add to bank
	107, // num + - add to bank
	90,  // z - penalty left
	88,  // x - penalty right
	67,  // c - penalty free
	188, // < - bank to left
	190, // > - bank to right
	32,  // space - next level, show/hide big table
	220, // \ - big game answer repeat
	65,  // a - show 25 seconds timer
	83   // s - show 30 seconds timer
]);
