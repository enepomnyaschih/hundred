var TimerView = function(msStart, direction) {
	TimerView._super.call(this);
	this.msStart = msStart || 0;
	this.direction = direction || 1;
	this.active = false;
	this.finished = false;
	this.hseconds = null;
	this.startTime = null;
	this.timer = null;
	this.expireEvent = new JW.Event();
};

JW.extend(TimerView, JW.UI.Component, {
	/*
	Fields
	Number msStart;
	Number direction;
	Boolean active;
	Boolean finished;
	Number hseconds;
	Number startTime;
	Integer timer;
	JW.Event expireEvent;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this.hseconds = Math.ceil(this.msStart / 500);
		this._checkFinish();
		this._redraw();
	},
	
	// override
	destroyComponent: function() {
		this.suspend();
		this._super();
	},
	
	resume: function() {
		if (!this.el || this.active || this.finished) {
			return;
		}
		this.active = true;
		this.startTime = new Date().getTime();
		this._runTimer();
	},
	
	suspend: function() {
		if (!this.el || !this.active) {
			return;
		}
		this.active = false;
		clearTimeout(this.timer);
		this.timer = 0;
		this.msStart += (new Date().getTime() - this.startTime) * this.direction;
	},
	
	_checkFinish: function() {
		this.finished = this.finished || ((this.direction < 0) && (this.hseconds <= 0));
	},
	
	_runTimer: function() {
		var hsecondsNext = this.hseconds;
		if (this.direction < 0) {
			--hsecondsNext;
		}
		var ms = Math.max(0, this._getZeroTime() + hsecondsNext * 500 * this.direction - new Date().getTime());
		this.timer = setTimeout(JW.inScope(this._onTimeout, this), ms);
	},
	
	_onTimeout: function() {
		this.timer = 0;
		this.hseconds += this.direction;
		this._checkFinish();
		this._redraw();
		if (this.finished) {
			this.suspend();
			this.expireEvent.trigger(new JW.EventParams(this));
			return;
		}
		this._runTimer();
	},
	
	_redraw: function() {
		var minutes = Math.floor(this.hseconds / 120);
		var seconds = Math.floor(this.hseconds / 2) % 60;
		var half = this.hseconds % 2;
		this.el.text(JW.String.prepend(String(minutes), 2, "0") + (half ? " " : ":") + JW.String.prepend(String(seconds), 2, "0"));
	},
	
	_getZeroTime: function() {
		return this.startTime - this.direction * this.msStart;
	}
});

JW.UI.template(TimerView, {
	main: '<div jwclass="ux-timer-view" />'
});
