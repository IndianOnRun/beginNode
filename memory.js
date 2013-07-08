var memTextCount = 1;

rememText = function(){}
rememText.prototype.dummyData = [];

rememText.prototype.findAll = function(callback) {
	callback(null, this.dummyData)
}

rememText.prototype.findById = function(id, callback) {
	var result = null;
	for (var i=0; i<this.dummyData.length;i++) {
		if (this.dummyData[i]._id == id) {
			result = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
}

rememText.prototype.save = function(text, callback) {
	var text = null;
	if(typeof(text.length)=="undefined")
		text = [text];

	for(var i=0; i<text.length;i++) {
		text = text[i];
		text._id = memTextCount++;
		text.created_at = new Date();

		this.dummyData[this.dummyData.length] = text;

	}
	callback(null, text);
};

new rememText().save([
	{body: 'Rohit1'},
	{body: 'Rohit2'}
], function(error, text){});

exports.rememText = rememText;
