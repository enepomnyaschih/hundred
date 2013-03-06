var BigTable = function(scoreData) {
	BigTable._super.call(this);
	this.scoreData = scoreData;
	this._onPriceChange = JW.inScope(this._onPriceChange, this);
};

JW.extend(BigTable, JW.UI.Component, {
	/*
	Fields
	ScoreData scoreData;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		for (var i = 0; i < 2; ++i) {
			this.el.append(this._renderColumn());
		}
		this._updateBank();
	},
	
	_renderColumn: function() {
		var el = jQuery(this.templates.column);
		for (var i = 0; i < 5; ++i) {
			el.append(this._renderRow());
		}
		return el;
	},
	
	_renderRow: function() {
		var el = jQuery(this.templates.row);
		el.find(".big-table-price").change(this._onPriceChange);
		return el;
	},
	
	_updateBank: function() {
		var els = this.el.find(".big-table-price");
		var bank = 0;
		for (var i = 0; i < els.length; ++i) {
			bank += (+jQuery(els[i]).val()) || 0;
		}
		this.scoreData.setBank(bank);
	},
	
	_onPriceChange: function() {
		this._updateBank();
	}
});

JW.UI.template(BigTable, {
	main   : '<div class="big-table" />',
	column : '<div class="big-table-column" />',
	row:
		'<div class="big-table-row">' +
			'<input type="text" class="big-table-answer" value="░░░░░░░░░░░░" size="12" maxlength="12" />' +
			'<input type="text" class="big-table-price" value="░░" size="2" maxlength="2" />' +
		'</div>'
});
