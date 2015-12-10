
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
var userRef = ref.child('chat/users');
var url = 'mighty-mesa-2159.herokuapp.com'



var Queue = new Queue(queueRef, function(data, progress, resolve, reject) {
  // sanitize input message
  console.log(data);
  
 var options = {
  host: url,
  port: 80,
  path: parse('/v1/users/'+ data.userId +'/notifications?chat_id=%s', data.chat_room),
  method: 'GET'
};

http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
}).end();

queueRef.child("tasks").child(data.signature).remove();



function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, function() {
        return args[i++];
    });
}


  // pass sanitized message and username along to be fanned out

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server listening at", addr.address + ":" + addr.port);
});