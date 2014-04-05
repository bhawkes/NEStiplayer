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
