//chatroom demo
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

const botName = 'ChatRoom';

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/chat", function(req, res) {
  let params = req.query;
  res.render("chat", {params});
});

// Run when client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room); //save user to DB

    socket.join(user.room);

    // Welcome current user
    socket.emit('message', formatMessage(botName, `Hi ${username}, welcome to join ${room}!`));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined this chatroom`)
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
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});