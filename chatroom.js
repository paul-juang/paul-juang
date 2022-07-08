//chatroom demo - from server.js
const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);

const path = require('path');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

const formatMessage = require('./utils/messages');

const {userJoin,getCurrentUser,userLeave,getRoomUsers} = require('./utils/users');

const votes = {yes:0, no:0, maybe:0} //for socket

const botName = '聊天室';

app.get("/", function(req, res) {
  res.render("socket");
});

app.get("/chatroom", function(req, res) {
  let params = req.query;
  res.render("chatroom", {params});
});

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room); //save user to DB

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, `歡迎${username}加入${room}群組!`));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username}加入聊天室`)
      );

    // Send users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username}已經離開聊天室`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

app.get("/votes", function(req, res) {
  res.render("votes", {votes});
});

io.on('connection', function(socket) {
  
  socket.on('submit vote',function(data) {  
    let selection = data["selection"]
    votes[selection] += 1   
    io.sockets.emit("announce vote", votes)//io.emit("message", votes) also works
    //socket.emit,socket.broadcast.emit
  })
})
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});