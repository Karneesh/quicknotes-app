import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('quicknotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // New state for theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme preference from localStorage, default to false (light mode)
    const savedTheme = localStorage.getItem('quicknotes-theme');
    return savedTheme === 'dark';
  });

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
  }, [notes]);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('quicknotes-theme', isDarkMode ? 'dark' : 'light');
    // Apply theme class to the body element
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]); // Re-run when isDarkMode changes

  const handleAddNote = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content for the note.');
      return;
    }
    const newNote = {
      id: Date.now(),
      title: title,
      content: content,
    };
    setNotes([...notes, newNote]);
    setTitle('');
    setContent('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="header-section">
        <h1>QuickNotes 📝</h1>
        <button onClick={toggleDarkMode} className="theme-toggle-button">
          {isDarkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>
      </div>

      <div className="note-input-section">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="note-title-input"
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="note-content-input"
          rows="4"
        ></textarea>
        <button onClick={handleAddNote} className="add-note-button">
          Add Note
        </button>
      </div>

      <div className="notes-display-section">
        {notes.length === 0 ? (
          <p className="no-notes-message">No notes yet. Start jotting down your ideas! 💡</p>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note.id} className="note-card">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <button onClick={() => handleDeleteNote(note.id)} className="delete-note-button">
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;