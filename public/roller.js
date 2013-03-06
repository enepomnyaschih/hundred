var Roller = function(scoreData) {
	Roller._super.call(this);
	this.level = -1;
	this.opened = false;
	this.scoreData = scoreData;
	this.table = null;
	this.bigTable = null;
	this.bigTableReplica = null;
	this._msTimerStart = 0;
	this._timer = 0;
	this._onTimer = JW.inScope(this._onTimer, this);
};

JW.extend(Roller, JW.UI.Component, {
	/*
	Fields
	Integer level;
	Boolean opened;
	ScoreData scoreData;
	Table table;
	BigTable bigTable;
	BigTable bigTableReplica;
	Integer _msTimerStart;
	Integer _timer;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this._updateFaceText();
	},
	
	// override
	afterAppend: function() {
		this._rotate(0);
	},
	
	// override
	destroyComponent: function() {
		clearInterval(this._timer);
		this._super();
	},
	
	roll: function() {
		if (this._timer) {
			return;
		}
		if (!this.opened && (this.level === DATA.answers.length)) {
			return;
		}
		this.opened = !this.opened;
		if (this.opened) {
			this.level = Math.min(DATA.answers.length, this.level + 1);
			if (this.table) {
				this.children.remove("table").destroy();
				this.table = null;
			}
			trackLevel[this.level].play();
			if (this.level < DATA.answers.length) {
				this.table = new Table(this.level);
				this.children.set(this.table, "table");
			} else {
				this.getElement("table").removeClass("table");
				this.bigTable = new BigTable(this.scoreData);
				this.children.set(this.bigTable, "table");
			}
		} else {
			this._updateFaceText();
			if (this.level < DATA.answers.length) {
				trackNextLevel.play();
			}
		}
		this._msTimerStart = new Date().getTime();
		this._timer = setInterval(this._onTimer, 40);
	},
	
	toggleBig: function() {
		if (this.bigTableReplica) {
			this.children.set(this.bigTable, "table");
			this.bigTable._updateBank();
			this.bigTableReplica.destroy();
			this.bigTableReplica = null;
			return;
		}
		if (this.bigTable) {
			this.bigTableReplica = new BigTable(this.scoreData);
			this.children.set(this.bigTableReplica, "table");
			return;
		}
	},
	
	_updateFaceText: function() {
		var text;
		switch (this.level) {
			case -1: text = "ПРОСТАЯ ИГРА"; break;
			case  0: text = "ДВОЙНАЯ ИГРА"; break;
			case  1: text = "ТРОЙНАЯ ИГРА"; break;
			case  2: text = "ИГРА НАОБОРОТ"; break;
			case  3: text = "БОЛЬШАЯ ИГРА"; break;
			default: text = "ПОЗДРАВЛЯЕМ!"; break;
		}
		this.getElement("face-text").text(text);
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
		var xface = -Math.sin(Math.PI * sfactor / 2);
		var xback = Math.cos(Math.PI * ufactor / 2);
		
		Util.setTransform(this.getElement("face"),
			"skewY(" + (5 * xface) + "deg) " +
			"scaleX(" + Math.min(1, 0.005 + Math.cos(Math.PI * sfactor / 2)) + ")");
		Util.setTransform(this.getElement("back"),
			"skewY(" + (5 * xback) + "deg) " +
			"scaleX(" + Math.min(1, 0.005 + Math.sin(Math.PI * ufactor / 2)) + ")");
		
		this.getElement("face-mask").css("opacity", .8 * (1 - Math.cos(Math.PI * sfactor / 2)));
		this.getElement("back-mask").css("opacity", .8 * (1 - Math.sin(Math.PI * ufactor / 2)));
		
		this.getElement("face-mask").css("display", (factor === Math.round(factor)) ? "none" : "");
		this.getElement("back-mask").css("display", (factor === Math.round(factor)) ? "none" : "");
		
		this.getElement("face").css("left", (radius * xface) + "px");
		this.getElement("back").css("left", (radius * xback) + "px");
	}
});

JW.UI.template(Roller, {
	main:
		'<div jwclass="roller">' +
			'<div jwid="face">' +
				'<div jwid="face-text" />' +
				'<div jwid="face-mask" class="roller-mask" />' +
			'</div>' +
			'<div jwid="back">' +
				'<div jwid="table" />' +
				'<div jwid="back-mask" class="roller-mask" />' +
			'</div>' +
		'</div>'
});
