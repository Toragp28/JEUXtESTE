// Add Socket.IO client-side code to `ste.js`

// Listen for opponent movement and update positions
socket.on('moveOpponent', (position) => {
    // Update opponent's position based on position data received
    player2Position = position;
    player2.style.left = player2Position + 'px';
});

// Listen for opponent attacks
socket.on('attackOpponent', () => {
    // Trigger attack animation on opponent's character
    attack(player1); // Assuming player1 is the local player
});

// Modify attack and movement functions to emit events to the server
function attack(target) {
    if (checkCollision()) {
        let damage = normalDamage;
        if (Math.random() < criticalHitChance) {
            damage = criticalDamage;
        }
        
        if (target === player1) {
            player1Health -= damage;
        } else if (target === player2) {
            player2Health -= damage;
            socket.emit('damageOpponent', damage); // Notify server of damage dealt
        }
        updateHealthBar();
        checkGameOver();
    }
}

// Emit player's movement to the server
document.addEventListener('keydown', (event) => {
    // Player 1 controls
    switch (event.key.toLowerCase()) {
        case 'arrowleft':
            // Update player1Position and emit it to server
            socket.emit('move', player1Position);
            break;
        // Handle other movement keys similarly
    }
});

// Function to handle opponent's damage update
socket.on('updateOpponentHealth', (health) => {
    player2Health = health;
    updateHealthBar();
    checkGameOver();
});

// Function to handle game over state
socket.on('gameOver', (winner) => {
    if (winner === 'player1') {
        winnerMessage.textContent = 'You Win!';
    } else {
        winnerMessage.textContent = 'You Lose!';
    }
    winnerMessage.style.display = 'block';
});
