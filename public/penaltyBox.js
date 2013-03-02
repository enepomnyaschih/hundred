var PenaltyBox = function() {
	PenaltyBox._super.call(this);
	this.penalty = 0;
	this.cells = [];
};

JW.extend(PenaltyBox, JW.UI.Component, {
	/*
	Fields
	Integer penalty;
	Array<PenaltyBox.Cell> cells;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		
		this.cells = new JW.Array();
		for (var i = 0; i < DATA.maxPenalty; ++i) {
			this.cells.add(new PenaltyBox.Cell());
		}
		this.addArray(this.cells);
	},
	
	// override
	destroyComponent: function() {
		this.cells.eachByMethod("destroy");
		this._super();
	},
	
	addPenalty: function() {
		if (this.penalty >= DATA.maxPenalty) {
			return;
		}
		this.cells.get(this.penalty).setActive(true);
		++this.penalty;
	},
	
	reset: function() {
		this.cells.eachByMethod("setActive", [ false ]);
	}
});

JW.UI.template(PenaltyBox, {
	main: '<div jwclass="penalty-box" />'
});
