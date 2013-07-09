var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

HoldText = function(){
	this.db = new Db('pastehit', new Server('localhost', 27017, {auto_reconnect: true}, {}), {safe: false});
	this.db.open(function(){});
};

HoldText.prototype.getCollection = function(callback) {
	this.db.collection('texts', function(error, text_collection) {
		if (error) callback(error);
		else callback(null, text_collection);
	});
};


HoldText.prototype.findAll = function(callback) {
	console.log("pre-getCollection");
	this.getCollection(function(error, text_collection) {
		if (error) {
			callback(error);
			console.log("FLAG 1");
		}
		else { 
			console.log("FLAG 2");
			text_collection.find().toArray(function(error, results) {
				if( error ) {
					callback(error);
					console.log("FLAG2B");
				} else {
					console.log("FLAG3");
					callback(null, results);			
					console.log("FLAG4");
				}
				console.log("^^^^^^ THIS IS THE PROBLEM");
				//this.db.close();	
		 	});
		}
	});
};

HoldText.prototype.findById = function(id, callback) {
	this.getCollection(function(error, text_collection) {
		if( error ) callback(error)
		else {
			text_collection.findOne({_id: text_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
				if( error ) callback(error)
				else callback(null, result)
			});
		}
	});
};



HoldText.prototype.save = function(texts, callback) {
	this.getCollection(function(error, text_collection) {
		if (error) callback(error)
		else {
			if(typeof(texts.length) == 'undefined')
				texts = [texts];
			for(var i=0; i<texts.length;i++) {
				text = texts[i];
				//text._id = memTextCount++;
			}	//text.created_at = new Date();
			text_collection.insert(texts, function() {
				console.log(texts);
				callback(null, texts);
			});	
			//this.db.close();
		}
	});
};

new HoldText().save([
	{ body : 'Rohit1' },
	{ body : 'Rohit2' }
], function(error, texts){});

exports.HoldText = HoldText;
