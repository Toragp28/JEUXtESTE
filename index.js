document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Initialize Socket.IO

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const createGameBtn = document.getElementById('create-game-btn');
    const loginContainer = document.querySelector('.login-container');
    const gameContainer = document.getElementById('game-container');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            socket.emit('login', username);
            loginContainer.style.display = 'none';
            gameContainer.style.display = 'block';
        }
    });

    createGameBtn.addEventListener('click', () => {
        socket.emit('createGame');
    });
});

