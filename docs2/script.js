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

// Register functionality
registerButton.addEventListener('click', async () => {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Check if the user already exists
    if (users[username]) {
        registerMessage.textContent = 'User already exists.';
        return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Store user data in memory (or use sessionStorage)
    users[username] = { email, password: hashedPassword };

    registerMessage.textContent = 'User registered successfully!';
    registerForm.reset();
});

// Login functionality
loginButton.addEventListener('click', async () => {
    const username = document.getElementById('loginEmail').value; // Using email for login
    const password = document.getElementById('loginPassword').value;

    // Check if the user exists
    const user = users[username];
    if (!user) {
        loginMessage.textContent = 'User not found.';
        return;
    }

    // Verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        loginMessage.textContent = 'Login successful!';
        sessionStorage.setItem('loggedInUser', username); // Store username in session storage
        // Redirect or do something after successful login
        // e.g., window.location.href = 'dashboard.html';
    } else {
        loginMessage.textContent = 'Invalid password.';
    }
});
