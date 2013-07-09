var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, db) {
  db.collection("replicaset1").update({a:1}, {b:1}, {upsert:true}, function(err, result) {});
});
