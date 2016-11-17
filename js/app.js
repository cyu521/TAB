var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://127.0.0.1:27017/tab';
var fs = require('fs');

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	
	fs.readFile('../data/CSProfessors.json', 'utf8', function(err, data) {
		if (err) throw err;
		var json = JSON.parse(data);
		//console.log(data);
		db.collection('professors').insert(json, function(err, result){
			if (err) throw err;
			console.log(result);
			
			db.close();
		});

	});
		
		


    console.log("Connected successfully to server");

});