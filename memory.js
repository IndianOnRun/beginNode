var memTextCount = 1;

HoldText = function(){};
HoldText.prototype.dummyData = [];

HoldText.prototype.findAll = function(callback) {
	callback(null, this.dummyData)
};

HoldText.prototype.findById = function(id, callback) {
	var result = null;
	for (var i=0; i<this.dummyData.length;i++) {
		if (this.dummyData[i]._id == id) {
			result = this.dummyData[i];
			break;
		}
	}
	callback(null, result);
};

HoldText.prototype.save = function(texts, callback) {
	var text = null;
	//empty list returns back whatever we have
	if(typeof(texts.length)=="undefined")
		texts = [texts];
	//saves the texts one by one
	for(var i=0; i<texts.length;i++) {
		text = texts[i];
		text._id = memTextCount++;
		//text.created_at = new Date();
		
		this.dummyData[this.dummyData.length] = text;

	}
	callback(null, texts);
};

new HoldText().save([
	{body: 'Rohit1'},
	{body: 'Rohit2'}
], function(error, texts){});

exports.HoldText = HoldText;
