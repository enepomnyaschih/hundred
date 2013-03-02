var ScoreData = function() {
	ScoreData._super.call(this);
	this.bank = 0;
	this.scores = [ 0, 0 ];
	this.bankChangeEvent = new JW.Event();
	this.scoreChangeEvents = [ new JW.Event(), new JW.Event() ];
};

JW.extend(ScoreData, JW.Class, {
	/*
	Fields
	Integer bank;
	Array<Integer> scores;
	JW.Event<JW.ValueEventParams> bankChangeEvent;
	Array<JW.Event<JW.ValueEventParams>> scoreChangeEvents;
	*/
	
	// override
	destroy: function() {
		this.scoreChangeEvents[0].destroy();
		this.scoreChangeEvents[1].destroy();
		this.bankChangeEvent.destroy();
		this._super();
	},
	
	setBank: function(value) {
		this.bank = value;
		this.bankChangeEvent.trigger(new JW.ValueEventParams(this, this.bank));
	},
	
	increaseBank: function(price) {
		this.setBank(this.bank + price);
	},
	
	pullBank: function(team) {
		this.increaseScore(team, this.bank);
		this.setBank(0);
	},
	
	setScore: function(team, value) {
		this.scores[team] = value;
		this.scoreChangeEvents[team].trigger(new JW.ValueEventParams(this, this.scores[team]));
	},
	
	increaseScore: function(team, value) {
		this.setScore(team, this.scores[team] + value);
	}
});
