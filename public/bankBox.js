var BankBox = function(scoreData) {
	BankBox._super.call(this);
	this.scoreData = scoreData;
	this._bankChangeAttachment = null;
};

JW.extend(BankBox, ScoreBox, {
	/*
	Fields
	ScoreData scoreData;
	JW.EventAttachment _bankChangeAttachment;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this._update();
		this._bankChangeAttachment = this.scoreData.bankChangeEvent.bind(this._update, this);
	},
	
	// override
	destroyComponent: function() {
		this._bankChangeAttachment.destroy();
		this._super();
	},
	
	_update: function() {
		this.setValue(this.scoreData.bank);
	}
});
