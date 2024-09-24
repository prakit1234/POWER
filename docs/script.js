// Define the navigation items
const navItems = [
    { name: 'Docs2', href: '/docs2/' } // Only the link to docs2
];

// Get the navigation list element
const navList = document.getElementById('nav-list');

// Create and append list items
navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.name;
    li.appendChild(a);
    navList.appendChild(li);
});

// Get the button element
const getStartedButton = document.getElementById('get-started');

// Add event listener to the button
getStartedButton.addEventListener('click', () => {
    // Redirect to the subsite (e.g., 'docs2' subdirectory)
    window.location.href = '.https://prakit1234.github.io/POWER/docs2/index.html'; // Adjust the URL as needed
});
