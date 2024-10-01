const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require("cors");

// Allow CORS for all origins (you can restrict this later)
app.use(cors());

const users = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  // When a user joins
  socket.on('user-joined', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  // When a message is sent
  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
  });

  // When a user disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete users[socket.id];
  });
});

// Start the server
http.listen(3000, () => {
  console.log('Listening on *:3000');
});
