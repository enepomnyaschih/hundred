var Answer = function(text, price, index) {
	Answer._super.call(this);
	this.text = text;
	this.price = price;
	this.index = index;
	this.number = index + 1;
	this.revealed = false;
};

JW.extend(Answer, JW.UI.Component, {
	/*
	Fields
	String text;
	Integer price;
	Integer index;
	Integer number;
	Boolean revealed;
	*/
	
	// override
	renderComponent: function() {
		this._super();
		this.getElement("text").text(this.text);
		this.getElement("price").text(this.price);
		this.getElement("number").text(this.number);
	}
});
