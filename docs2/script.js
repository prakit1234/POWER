// Toggle between login and register forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Redirect buttons
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');

// Toggle between forms
showRegisterLink.addEventListener('click', () => {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

showLoginLink.addEventListener('click', () => {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Redirection logic for login and register buttons
loginButton.addEventListener('click', () => {
    window.location.href = 'https://prakit1234.github.io/POWER/docs3/index.html'; // Redirect to login subsite
});

registerButton.addEventListener('click', () => {
    window.location.href = 'https://prakit1234.github.io/POWER/docs3/index.html'; // Redirect to register subsite
});
