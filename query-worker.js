
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

var Queue = require('firebase-queue'),
    Firebase = require('firebase');

var ref = new Firebase('https://urvirl.firebaseio.com');
var queueRef = ref.child('queue');
var messagesRef = ref.child('chat/room-messages');

var options = {
  'specId': 'sanitize_message'
};

var sanitizeQueue = new Queue(queueRef, options, function(data, progress, resolve, reject) {
  // sanitize input message
  console.log(data.message);

  // pass sanitized message and username along to be fanned out

});