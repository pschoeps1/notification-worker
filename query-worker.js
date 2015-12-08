
var Queue = require('firebase-queue'),
    Firebase = require('firebase');

var ref = new Firebase('https://urvirl.firebaseio.com/queue');
var queue = new Queue(ref, function(data, progress, resolve, reject) {
  // Read and process task data
  console.log(data);

  // Do some work
  progress(50);

  // Finish the task asynchronously
  setTimeout(function() {
    resolve();
  }, 1000);
});