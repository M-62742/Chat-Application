<<<<<<< HEAD
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
=======
// server.js
const WebSocket = require('ws'); // Ensure you have the 'ws' package installed
const server = new WebSocket.Server({ port: 5001 });
const CLIENTS = [];

server.on('connection', function(ws) {
    CLIENTS.push(ws); // Add the new client to the list
    console.log('New connection');

    // Notify all clients that a new user has joined
    ws.on('message', function(message) {
        // Convert Buffer to string
        const msgString = message.toString();
        console.log('Received: ', msgString); // Log the message received from a client
        sendAll(msgString); // Broadcast the received message to all clients
    });

    ws.send("You joined this conversation"); // Send message to the newly connected client
    sendExceptCurrent(ws, 'New user joined this conversation'); // Notify others of the new user
});

// Function to send a message to all clients except the sender
function sendExceptCurrent(client, message) {
    CLIENTS.forEach((CLIENT) => {
        if (CLIENT !== client) {
            CLIENT.send(message); // Send message to all except the current client
        }
    });
}

// Function to send a message to all connected clients
function sendAll(message) {
    CLIENTS.forEach((CLIENT) => {
        CLIENT.send(message); // Send the received message to all clients
    });
}

console.log('WebSocket server is running on ws://localhost:5001');
>>>>>>> a8d9ad1 (fix issue #1 fixed and updated all)
