var socket = require('socket.io-client')('http://youwill.kiicloud.com:3000');
socket.on('connect', function(data){
  console.log('server connected');
  socket.emit('storeCommandID', { commandID:"7e041820-8e7a-11e5-ace9-00163e007aba" });
  socket.on('greeting', function(data){
    console.log(data)
  })
  socket.on('actionResult', function(data){
    console.log(JSON.stringify(data))
  })
});
