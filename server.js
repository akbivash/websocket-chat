const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path');
const formatMessage = require('./utils/message');
const { joinChat, leaveChat, getCurrentUser, getRoomUsers } = require('./utils/users');

app.use(express.static(path.join(__dirname, 'public')))

var botName = 'BisCord'

io.on('connection', (socket) => {

  socket.on('joinChat', (data) => {
    const user = joinChat(socket.id, data.username, data.room)
    socket.join(user.room)
    socket.emit('message', formatMessage(botName, 'Welcome to BisCord'))
    socket.broadcast.to(data.room).emit('message', formatMessage(botName, `${data.username} joined the chat`))

    io.to(data.room).emit('roomUsers', {
      room: data.room,
      users: getRoomUsers(data.room)
    })
  })

  socket.on('disconnect', () => {
    const { username, room } = getCurrentUser(socket.id)
    leaveChat(socket.id)
    io.to(room).emit('message', formatMessage(botName, `${username} left the chat`))
  })


  socket.on('message', msg => {
    const user = getCurrentUser(socket.id)
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});