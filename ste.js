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
                break;
            case 'arrowright':
                player1Position = Math.min(gameContainer.clientWidth - player1.offsetWidth, player1Position + 10);
                player1.style.left = player1Position + 'px';
                break;
            case 'arrowup':
                if (!player1Jumping) {
                    player1Jumping = true;
                    jump(player1);
                }
                break;
            case 'arrowdown':
                attack(player2);
                break;
            // Player 2 controls
            case 'a':
                player2Position = Math.max(0, player2Position - 10);
                player2.style.left = player2Position + 'px';
                break;
            case 'd':
                player2Position = Math.min(gameContainer.clientWidth - player2.offsetWidth, player2Position + 10);
                player2.style.left = player2Position + 'px';
                break;
            case 'w':
                if (!player2Jumping) {
                    player2Jumping = true;
                    jump(player2);
                }
                break;
            case 's':
                attack(player1);
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
            }
            updateHealthBar();
            checkGameOver();
        }
    }

    function checkCollision() {
        const player1Rect = player1.getBoundingClientRect();
        const player2Rect = player2.getBoundingClientRect();
        return !(player1Rect.right < player2Rect.left || 
                 player1Rect.left > player2Rect.right || 
                 player1Rect.bottom < player2Rect.top || 
                 player1Rect.top > player2Rect.bottom);
    }

    function updateHealthBar() {
        player1HealthBarInner.style.width = player1Health + '%';
        player2HealthBarInner.style.width = player2Health + '%';
    }

    function checkGameOver() {
        if (player1Health <= 0) {
            winnerMessage.textContent = 'Player 2 Wins!';
            winnerMessage.style.display = 'block';
        } else if (player2Health <= 0) {
            winnerMessage.textContent = 'Player 1 Wins!';
            winnerMessage.style.display = 'block';
        }
    }
});
