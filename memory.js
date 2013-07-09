var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

HoldText = function(host, port){
	this.db = new Db('pastehit', new Server(host, port, {auto_reconnect: true}, {}));
	this.db.open(function(){});
};

HoldText.prototype.getCollection = function(callback) {
	this.db.collection('texts', function(error, text_collection) {
		if (error) callback(error);
		else callback(null, text_collection);
	});
};


HoldText.prototype.findAll = function(callback) {
	this.getCollection(function(error, text_collection) {
		if (error) callback(error);
		else { 
			text_collection.find().toArray(function(error, results) {
				if (error) callback(error)
				else callback(null, results)			
		
		 	});
		}
	});
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
	this.getCollection(funtion(error, text_collection) {
		if (error) callback(error)
		else {
			if(typeof(texts.length) == 'undefined')
				texts = [texts];
			for(var i=0; i<texts.length;i++) {
				text = texts[i];
				text._id = memTextCount++;
			}	//text.created_at = new Date();
		}
		text_collection.insert(texts, function() {
			callback(null, texts);
		});
	
	});
};

new HoldText().save([
	{body: 'Rohit1'},
	{body: 'Rohit2'}
], function(error, texts){});

exports.HoldText = HoldText;
