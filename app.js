//socket.io demo
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;

const votes = {yes:0, no:0, maybe:0}

app.get("/", function(req, res) {
  res.render("socket", {votes: votes});
});

io.on('connection', function(socket) {
	
  socket.on('submit vote',function(data) { 	
  	let selection = data["selection"]
  	votes[selection] += 1 	
    io.sockets.emit("announce vote", votes)//io.emit("message", votes) also works
    //socket.emit,socket.broadcast.emit
  })
})

server.listen(PORT, function() {
  console.log('server running on '+ PORT) 
})