/*jshint esversion: 6 */
'use strict';
const fs = require('fs');
const http = require('http');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var ObjectId = require('mongodb').ObjectID;

// Connection URL
var url = 'mongodb://104.236.230.217:27017/profs';
var db;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, database) {
	db = database;
    console.log("Connected successfully to db server");
});

var port = 521;

app.use('/styles', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/node_modules/angular'));
app.use('/js', express.static(__dirname + '/node_modules/angular-route'));
app.use('/js', express.static(__dirname + '/node_modules/angular-location-decorator'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/fonts', express.static(__dirname + '/fonts'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/views', express.static(__dirname + '/html'));



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html')
});

app.post('/getResult', function (req, res) {
	var querys = req.body.query;
	var collection = db.collection("info");
	var partsOfStr = querys.split(',');
	var andArray = new Array();
	for (var i =0; i<partsOfStr.length; i++){
		var query = partsOfStr[i];
		//making sure query is not null or empty
		if(query != null && query.trim() != ""){
			
			var orArray = new Array();
			//look if query matches name, university, or subfield (topics)
			orArray.push({ Name:  new RegExp(query.trim(), "i")});
			orArray.push({ University:  new RegExp(query.trim(), "i")});
			orArray.push({ Subfield:  new RegExp(query.trim(), "i")});
			//adding results of this term to andArray
			andArray.push({$or: orArray});
		}
	}
	//find multiple terms that are related using andArray
	var findScript = { $and: andArray };
	collection.find(findScript).toArray(function(err, documents) {
		//return info
		res.json(documents)
  });
});


app.post('/getProfessorById', function (req, res) {
	var id = req.body.id;
	var collection = db.collection("info");
	collection.findOne(ObjectId(id), function(err, professor){
		res.json(professor)
	});
});


server.listen(port || process.env.PORT, function () {
    console.log('Server listening on http://localhost:' + port);
});
