const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve your HTML, CSS, and JS files from 'public' folder

const players = {}; // Store connected players

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('login', (username) => {
        players[socket.id] = { username };
        console.log(`${username} logged in`);
    });

    socket.on('createGame', () => {
        // Implement logic to create a new game instance
        // Example: Send initial game state to both players
    });

    socket.on('move', (position) => {
        // Broadcast the movement to the opponent
        socket.broadcast.emit('moveOpponent', position);
    });

    socket.on('damageOpponent', (damage) => {
        // Apply damage to opponent and update health
        // Example: Calculate new health and emit update to opponent
    });

    socket.on('disconnect', () => {
        if (players[socket.id]) {
            console.log(`${players[socket.id].username} disconnected`);
            delete players[socket.id];
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
