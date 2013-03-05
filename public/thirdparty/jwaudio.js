JW.Audio = {};

JW.Audio.Track = function(config) {
	JW.Audio.Track._super.call(this);
	this.mp3 = config.mp3;
	this.ogg = config.ogg;
	if (this.mp3) {
		jQuery('<img />').attr("src", this.mp3);
	} else {
		jQuery('<img />').attr("src", this.ogg);
	}
};

JW.extend(JW.Audio.Track, JW.Class, {
	/*
	Optional
	String mp3;
	String ogg;
	*/
	
	play: function() {
		return new JW.Audio.Playback(this, true);
	},
	
	createPlayback: function() {
		return new JW.Audio.Playback(this);
	}
});

JW.Audio.Playback = function(track, autoStart) {
	JW.Audio.Playback._super.call(this);
	this.track = track;
	this.audioEl = null;
	this.status = 0;
	this.finishEvent = new JW.Event();
	
	this._onEnded = JW.inScope(this._onEnded, this);
	this.audioEl = new Audio();
	
	var src = this.track.ogg || this.track.mp3;
	if (!this.audioEl.canPlayType("audio/ogg") && this.audioEl.canPlayType("audio/mpeg")) {
		src = this.track.mp3;
	}
	this.audioEl.src = src;
	
	if (this.audioEl.addEventListener) {
		this.audioEl.addEventListener('ended', this._onEnded, false);
	} else {
		this.audioEl.onended = this._onEnded;
	}
	if (autoStart) {
		this._startTimer = setTimeout(JW.inScope(this.start, this), 1);
	}
};

JW.extend(JW.Audio.Playback, JW.Class, {
	/*
	Fields
	JW.Audio.Track track;
	Audio audioEl;
	Integer status; // [readonly] Integer, 0 - ready, 1 - play, 2 - finished
	JW.Event finishEvent;
	Integer _startTimer;
	*/
	
	// override
	destroy: function() {
		this.stop();
		this.finishEvent.destroy();
		this._super();
	},
	
	start: function() {
		this._abortAutoStart();
		if (!this.isReady()) {
			return;
		}
		this.status = 1;
		this.audioEl.play();
	},
	
	stop: function() {
		this._abortAutoStart();
		if (this.isFinished()) {
			return;
		}
		if (this.isPlay()) {
			this.audioEl.pause();
		}
		if (this.audioEl.addEventListener) {
			this.audioEl.removeEventListener('ended', this._onEnded, false);
		} else {
			delete this.audioEl.onended;
		}
		this.status = 2;
		this.audioEl.src = "/dummy";
		delete this.audioEl;
	},
	
	isReady: function() {
		return this.status === 0;
	},
	
	isPlay: function() {
		return this.status === 1;
	},
	
	isFinished: function() {
		return this.status === 2;
	},
	
	_abortAutoStart: function() {
		if (!this._startTimer) {
			return;
		}
		clearTimeout(this._startTimer);
		delete this._startTimer;
	},
	
	_onEnded: function() {
		this.stop();
		this.finishEvent.trigger(new JW.EventParams(this));
	}
});
