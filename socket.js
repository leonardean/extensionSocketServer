var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');

var clients = {};
var socketIDs = {};
io.on('connection', function(socket){
  console.log("client connected");
  socket.on('storeCommandID', function(data){
    clients[data.commandID] = socket.id;
    socketIDs[socket.id] = data.commandID;
    //console.log('commandID stored ', socket.id);  //actual commandID is the objectID for the command object
    //io.sockets.connected[socket.id].emit('greeting', 'hello'); //send message to certain client
  });
  socket.on('disconnect', function(){
    console.log('client with id ', socket.id + ' disconnected');
    delete clients[socketIDs[socket.id]];
    delete socketIDs[socket.id];
    console.log('ids cleared')
  })
});
app.use(bodyParser.json());
app.get('/',function(req, res){
  res.send('Hello World');
  console.log(req)
})

app.post('/actionResult', function(req, res){
  console.log(req.body)
  var commandID = req.body.commandID;
  var actionResult = req.body.actionResult;
  io.sockets.connected[clients[commandID]].emit('actionResult', actionResult);
  res.send("actionResult sent")
})

server.listen(3000);
console.log("server started at port: 3000")
