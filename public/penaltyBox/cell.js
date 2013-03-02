PenaltyBox.Cell = JW.UI.Component.extend({
	setActive: function(value) {
		this.el.toggleClass("active", value);
	}
});

JW.UI.template(PenaltyBox.Cell, {
	main: '<div jwclass="penalty-box-cell" />'
});
