// Get elements
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');
const searchBar = document.getElementById('search-bar');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const voiceInputBtn = document.getElementById('voice-input-btn');
let isDarkMode = false;

// Array to store notes
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Display notes on page load
displayNotes();

// Add event listener for the Add Note button
addNoteBtn.addEventListener('click', addNote);

// Add event listener for dark mode toggle
darkModeToggle.addEventListener('click', toggleDarkMode);

// Voice Input for Note Content
voiceInputBtn.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';  // You can set other languages as well

    recognition.onstart = function () {
        voiceInputBtn.textContent = 'Listening...';
    };

    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('note-content').value = transcript;
        voiceInputBtn.textContent = '🎤 Voice Input';
    };

    recognition.onerror = function () {
        voiceInputBtn.textContent = '🎤 Voice Input';
        alert('Voice recognition error. Please try again.');
    };

    recognition.start();
});

// Function to add a new note
function addNote() {
    const date = document.getElementById('note-date').value;
    const subject = document.getElementById('note-subject').value;
    const content = document.getElementById('note-content').value;

    if (!date || !subject || !content) {
        alert('Please fill in all fields!');
        return;
    }

    const newNote = {
        id: Date.now(),
        date: date,
        subject: subject,
        content: content
    };

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    displayNotes();

    // Clear input fields
    document.getElementById('note-date').value = '';
    document.getElementById('note-subject').value = '';
    document.getElementById('note-content').value = '';
}

// Function to display notes
function displayNotes(filteredNotes = notes) {
    notesContainer.innerHTML = '';

    if (filteredNotes.length === 0 && notes.length > 0) {
        alert('No notes found!');
        return;
    }

    filteredNotes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-box');

        noteElement.innerHTML = `
            <div class="note-header">
                <div class="note-date">${note.date}</div>
                <button class="edit-btn" onclick="editNote(${note.id})">✏️</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">🗑️</button>
            </div>
            <div class="note-subject">${note.subject}</div>
            <div class="note-content">${note.content}</div>
        `;

        notesContainer.appendChild(noteElement);
    });
}

// Function to delete a note
function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Function to edit a note
function editNote(id) {
    const noteToEdit = notes.find(note => note.id === id);
    
    document.getElementById('note-date').value = noteToEdit.date;
    document.getElementById('note-subject').value = noteToEdit.subject;
    document.getElementById('note-content').value = noteToEdit.content;

    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Add event listener for search
searchBar.addEventListener('keyup', function () {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.subject.toLowerCase().includes(searchTerm) ||
        note.content.toLowerCase().includes(searchTerm)
    );

    displayNotes(filteredNotes);
});

// Function to toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    if (isDarkMode) {
        darkModeToggle.style.backgroundColor = 'white';
        darkModeToggle.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        darkModeToggle.style.backgroundColor = '#4CAF50';
        darkModeToggle.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Check local storage for theme preference on load
(function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.style.backgroundColor = 'white';
        darkModeToggle.innerHTML = '☀️';
        isDarkMode = true;
    }
})();


