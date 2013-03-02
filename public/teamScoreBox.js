var TeamScoreBox = function(scoreData, team) {
	TeamScoreBox._super.call(this);
	this.scoreData = scoreData;
	this.team = team;
	this._scoreChangeAttachment = null;
};

JW.extend(TeamScoreBox, ScoreBox, {
	/*
	Fields
	ScoreData scoreData;
	Integer team;
	JW.EventAttachment _scoreChangeAttachment;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this._update();
		this._scoreChangeAttachment = this.scoreData.scoreChangeEvents[this.team].bind(this._update, this);
	},
	
	// override
	destroyComponent: function() {
		this._scoreChangeAttachment.destroy();
		this._super();
	},
	
	_update: function() {
		this.setValue(this.scoreData.scores[this.team]);
	}
});
