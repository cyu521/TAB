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
var url = 'mongodb://127.0.0.1:27017/tab';
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
	var query = req.body.query;
	var collection = db.collection("professors");
	var findScript = { $or: [ { Name:  new RegExp(query)}, { University:  new RegExp(query)}, { Subfield:  new RegExp(query)} ] };
	collection.find(findScript).toArray(function(err, documents) {
		
		res.json(documents)
  });
});


app.post('/getProfessorById', function (req, res) {
	var id = req.body.id;
	var collection = db.collection("professors");
	collection.findOne(ObjectId(id), function(err, professor){
		
		res.json(professor)
	});
});



// app.get('/profile', function (req, res) {
    // res.sendFile(__dirname + '/html/profile.html')
// });



server.listen(port || process.env.PORT, function () {
    console.log('Server listening on http://localhost:' + port);
});
