var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;


HoldText = function(host1, port1){
	this.db = new Db("pastehit", new Server(host1, port1, {auto_reconnect: true}, {}), {safe: false});
	this.db.open(function(){});
};

HoldText.prototype.getCollection = function(callback) {
	this.db.collection("texts", function(error, text_collection) {
		if (error) callback(error);
		else callback(null, text_collection);
	});
};


HoldText.prototype.findAll = function(callback) {
	this.getCollection(function(error, text_collection) {
		if (error) {
			callback(error);
		}
		else { 
			text_collection.find( { } , { _id: 0 } ).toArray(function(error, results) {
				if( error ) {
					callback(error);
				} else {
					callback(null, results);			
				}
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

exports.HoldText = HoldText; 
