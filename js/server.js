/*jshint esversion: 6 */
'use strict';
const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io').listen(server);

var port = 521;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/html/index.html')
});

app.get('/search', function (req, res) {
    res.sendFile(__dirname + '/html/result.html')
});


app.get('/profile', function (req, res) {
    res.sendFile(__dirname + '/html/profile.html')
});


server.listen(port || process.env.PORT, function () {
    console.log('Server listening on http://localhost:' + port);
});
