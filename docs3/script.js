// Get elements
const addNoteBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');
const searchBar = document.getElementById('search-bar');
const themeToggle = document.getElementById('theme-toggle');
const exportBtn = document.getElementById('export-notes-btn');

// Array to store notes
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Display notes on page load
displayNotes();

// Add event listener for the Add Note button
addNoteBtn.addEventListener('click', addNote);

// Function to add a new note
function addNote() {
    const date = document.getElementById('note-date').value;
    const subject = document.getElementById('note-subject').value;
    const content = document.getElementById('note-content').value;
    const priority = document.getElementById('note-priority').value;

    if (!date || !subject || !content) {
        alert('Please fill in all fields!');
        return;
    }

    // Create note object
    const newNote = {
        id: Date.now(),
        date: date,
        subject: subject,
        content: content,
        priority: priority,
    };

    // Add note to array and local storage
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));
    
    displayNotes();

    // Clear input fields
    document.getElementById('note-date').value = '';
    document.getElementById('note-subject').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('note-priority').value = 'low';
}

// Function to display notes
function displayNotes() {
    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        noteElement.innerHTML = `
            <div class="note-subject">${note.subject}</div>
            <div class="note-date">${note.date}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-priority">Priority: ${note.priority}</div>
            <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
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
    document.getElementById('note-priority').value = noteToEdit.priority;

    // Remove the note to be edited from the array
    notes = notes.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Add event listener for search
searchBar.addEventListener('keyup', function () {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredNotes = notes.filter(note =>
        note.subject.toLowerCase().includes(searchTerm)
    );

    // Clear and display filtered notes
    notesContainer.innerHTML = '';

    filteredNotes.forEach(note => {
        const noteElement = document.createElement
