var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    mc = require("mac-control");

server.listen(3000);

io.set( 'log level', 1 );

app.use(express.static(__dirname + "/public"));

app.get('/',function(req,res){
    res.sendFile('index.html');
});

var playerCount = 0;
var players = {};

var currentState = {
    "up":false,
    "down":false,
    "left":false,
    "right":false,
    "a":false,
    "b":false,
    "start":false,
    "select":false
};

var newState = {};

var threshold = .5;

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
        updateKeys();
    });

    socket.on('disconnect', function(){
        delete players[socket.id];
        playerCount--;
    });

});


function updateKeys(){
    // set counts to 0
    var upCount = 0;
    var downCount = 0;
    var leftCount = 0;
    var rightCount = 0;
    var aCount = 0;
    var bCount = 0;
    var startCount = 0;
    var selectCount = 0;
        
    // then count each player pressing a button
    for ( var id in players) {
            
        var player = players[id];
            
        if(player.keys.up) upCount++;
        if(player.keys.down) downCount++;
        if(player.keys.left) leftCount++;
        if(player.keys.right) rightCount++;
        if(player.keys.a) aCount++;
        if(player.keys.b) bCount++;
        if(player.keys.start) startCount++;
        if(player.keys.select) selectCount++;
                	
    }
    
    newState = {};
    
    newState.up = Math.round((upCount / playerCount)) > threshold ? true : false;
    newState.down = Math.round((downCount / playerCount)) > threshold ? true : false;
    newState.left = Math.round((leftCount / playerCount)) > threshold ? true : false;
    newState.right = Math.round((rightCount / playerCount)) > threshold ? true : false;
    newState.a = Math.round((aCount / playerCount)) > threshold ? true : false;
    newState.b = Math.round((bCount / playerCount)) > threshold ? true : false;
    newState.start = Math.round((startCount / playerCount)) > threshold ? true : false;
    newState.select = Math.round((selectCount / playerCount)) > threshold ? true : false;
    
    checkKeys();
    
}

function checkKeys(){
    
    console.log(currentState.a + "->" + newState.a);
    
    if(newState.a != currentState.a){
        if(newState.a){
            mc.keyHold("x");
        } else {
            mc.keyRelease("x");
        }
    }
    
    
    currentState.a = newState.a;
}
