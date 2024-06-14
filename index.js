document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const createGameBtn = document.getElementById('create-game-btn');
    const loginContainer = document.querySelector('.login-container');
    const gameContainer = document.getElementById('game-container');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            }).then(response => {
                if (response.ok) {
                    loginContainer.style.display = 'none';
                    gameContainer.style.display = 'block';
                }
            });
        }
    });

    createGameBtn.addEventListener('click', () => {
        fetch('/createGame', { method: 'POST' })
            .then(response => response.ok && console.log('Game created'));
    });
});


