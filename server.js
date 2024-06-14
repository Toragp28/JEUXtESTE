const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

const players = {
    player1: { health: 100, position: 100 },
    player2: { health: 100, position: 700 } // Assuming the game container width is 800px
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/login', (req, res) => {
    const { username } = req.body;
    // Handle login logic here
    console.log(`${username} logged in`);
    res.status(200).send('Logged in');
});

app.post('/createGame', (req, res) => {
    // Handle game creation logic here
    console.log('Game created');
    res.status(200).send('Game created');
});

app.post('/move', (req, res) => {
    const { player, position } = req.body;
    if (players[player]) {
        players[player].position = position;
        res.status(200).send('Position updated');
    } else {
        res.status(400).send('Invalid player');
    }
});

app.post('/attack', (req, res) => {
    const { attacker } = req.body;
    const target = attacker === 'player1' ? 'player2' : 'player1';

    let damage = 10;
    if (Math.random() < 0.2) {
        damage = 20;
    }

    if (players[target]) {
        players[target].health -= damage;
        if (players[target].health <= 0) {
            res.status(200).send({ message: `${attacker} wins!`, gameOver: true });
        } else {
            res.status(200).send({ health: players[target].health });
        }
    } else {
        res.status(400).send('Invalid player');
    }
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
