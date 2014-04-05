var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    mac_control = require("mac-control");

server.listen(3000);

io.set( 'log level', 1 );

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
    res.sendFile('index.html');
});

var playerCount = 0;
var players = {};
var state = {};

io.sockets.on('connection', function(socket){
        
    playerCount++;
    
    players[socket.id] = {
        keys:{
            "up":false,
            "down":false,
            "left":false,
            "right":false,
            "a":false,
            "b":false,
            "start":false,
            "select":false
        }
    };

    socket.on('keys', function(data){
        players[socket.id].keys = data;
        console.log(data);
    });

    socket.on('disconnect', function(){
        delete players[socket.id];
        playerCount--;
    });

});

