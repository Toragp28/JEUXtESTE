document.addEventListener('DOMContentLoaded', () => {
    const player1 = document.getElementById('player1');
    const player2 = document.getElementById('player2');
    const player1HealthBarInner = document.getElementById('player1-health');
    const player2HealthBarInner = document.getElementById('player2-health');
    const winnerMessage = document.getElementById('winner-message');
    const gameContainer = document.querySelector('.game-container');

    let player1Position = 100;
    let player2Position = gameContainer.clientWidth - 200;
    let player1Health = 100;
    let player2Health = 100;
    let player1Jumping = false;
    let player2Jumping = false;

    // Damage configuration
    const normalDamage = 10;
    const criticalDamage = 20;
    const criticalHitChance = 0.2; // 20% chance of critical hit

    document.addEventListener('keydown', (event) => {
        if (player1Health <= 0 || player2Health <= 0) {
            return;
        }

        const key = event.key.toLowerCase();
        switch (key) {
            // Player 1 controls
            case 'arrowleft':
                player1Position = Math.max(0, player1Position - 10);
                player1.style.left = player1Position + 'px';
                updatePosition('player1', player1Position);
                break;
            case 'arrowright':
                player1Position = Math.min(gameContainer.clientWidth - player1.offsetWidth, player1Position + 10);
                player1.style.left = player1Position + 'px';
                updatePosition('player1', player1Position);
                break;
            case 'arrowup':
                if (!player1Jumping) {
                    player1Jumping = true;
                    jump(player1);
                }
                break;
            case 'arrowdown':
                attack('player1');
                break;
            // Player 2 controls
            case 'a':
                player2Position = Math.max(0, player2Position - 10);
                player2.style.left = player2Position + 'px';
                updatePosition('player2', player2Position);
                break;
            case 'd':
                player2Position = Math.min(gameContainer.clientWidth - player2.offsetWidth, player2Position + 10);
                player2.style.left = player2Position + 'px';
                updatePosition('player2', player2Position);
                break;
            case 'w':
                if (!player2Jumping) {
                    player2Jumping = true;
                    jump(player2);
                }
                break;
            case 's':
                attack('player2');
                break;
        }
    });

    function jump(character) {
        let jumpCount = 0;
        const jumpInterval = setInterval(() => {
            const jumpHeight = 100;
            const maxJumps = 10;
            if (jumpCount >= maxJumps) {
                clearInterval(jumpInterval);
                character.style.bottom = '0px';
                if (character === player1) {
                    player1Jumping = false;
                } else {
                    player2Jumping = false;
                }
                return;
            }
            character.style.bottom = (jumpHeight * Math.sin((jumpCount / maxJumps) * Math.PI)) + 'px';
            jumpCount++;
        }, 50);
    }

    function attack(attacker) {
        fetch('/attack', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ attacker })
        }).then(response => response.json())
            .then(data => {
                if (data.gameOver) {
                    winnerMessage.textContent = data.message;
                    winnerMessage.style.display = 'block';
                } else {
                    if (attacker === 'player1') {
                        player2Health = data.health;
                        player2HealthBarInner.style.width = player2Health + '%';
                    } else {
                        player1Health = data.health;
                        player1HealthBarInner.style.width = player1Health + '%';
                    }
                }
            });
 }

    function updatePosition(player, position) {
        fetch('/move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player, position })
        });
    }
});
