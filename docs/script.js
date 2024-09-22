// Get the button element
const getStartedButton = document.getElementById('get-started');

// Add event listener to the button
getStartedButton.addEventListener('click', () => {
    // Redirect to the subsite (e.g., 'docs2' subdirectory)
    window.location.href = '/docs2/';
});
