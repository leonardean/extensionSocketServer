var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(data){
  console.log('server connected');
  socket.emit('storeCommandID', { commandID:"000CustomIdHere0000" });
  socket.on('greeting', function(data){
    console.log(data)
  })
});
