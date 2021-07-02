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

app.get("/",function(req, res) {
  //res.render("socket");
  send("hello world")
});

io.on('connection', function(socket) {
  console.log('Client connected: '+socket.id)

  socket.on('message',function(data) {
    socket.broadcast.emit("message",data)
  })

})

server.listen(PORT, function() {
  console.log('server running on '+ PORT) 
})