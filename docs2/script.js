// Toggle between login and register forms
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

// Redirect buttons
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');

// Messages
const loginMessage = document.getElementById('login-message');
const registerMessage = document.getElementById('register-message');

// Sample in-memory storage (for demo purposes, use session storage)
let users = {};

// Toggle between forms
showRegisterLink.addEventListener('click', () => {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
});

showLoginLink.addEventListener('click', () => {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
});

// Handle Login
loginButton.addEventListener('click', () => {
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;

    // Check if user exists
    if (users[email] && users[email].password === password) {
        // Redirect to the desired URL on successful login
        window.location.href = 'https://notesgg.onrender.com'; // Change to your desired URL
    } else {
        loginMessage.textContent = 'Invalid email or password, but we’ll let you in for now.';
        // Pop-up message (alternative)
        alert('Hey! Don’t worry, please log in to continue. It’s for security as our server uses bcrypt.');
    }
});

// Handle Registration
registerButton.addEventListener('click', () => {
    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    // Basic validation
    if (username && email && password) {
        // Store user info in memory (for demo purposes)
        if (!users[email]) {
            users[email] = { username, password };
            registerMessage.textContent = 'Registration successful! Please log in.';
            alert('Hey! Don’t worry, please log in to continue. It’s for security as our server uses bcrypt.');
            showLoginLink.click(); // Automatically switch to login form after successful registration
        } else {
            registerMessage.textContent = 'Email is already registered.';
        }
    } else {
        registerMessage.textContent = 'Please fill in all fields.';
    }
});

// Google Sign-In handler
function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    alert('Welcome ' + profile.getName() + '! You have successfully signed in using Google.');
}
