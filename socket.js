var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var clients = {};
var socketIDs = {};
io.on('connection', function(socket){
  socket.on('storeCommandID', function(data){
    clients[data.commandID] = socket.id;
    socketIDs[socket.id] = data.commandID;
  });
  socket.on('disconnect', function(){
    delete clients[socketIDs[socket.id]];
    delete socketIDs[socket.id];
  })
});
app.use(bodyParser.json());
app.get('/',function(req, res){
  res.send('Hello World');
})

app.post('/actionResult', function(req, res){
  var commandID = req.body.commandID;
  var actionResult = req.body.actionResult;
  io.sockets.connected[clients[commandID]].emit('actionResult', actionResult);
  res.send("actionResult sent")
})

server.listen(3000);
console.log("server started at port: 3000")
