const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('login', (username) => {
        console.log(`${username} logged in`);
    });

    socket.on('createGame', () => {
        console.log('Game created');
    });

    socket.on('move', (data) => {
        socket.broadcast.emit('moveOpponent', data);
    });

    socket.on('attack', (data) => {
        socket.broadcast.emit('attackOpponent', data);
    });

    socket.on('gameOver', (winner) => {
        socket.broadcast.emit('gameOver', winner);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
