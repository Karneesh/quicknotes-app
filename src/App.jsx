import React, { useState, useEffect } from 'react';
import './App.css'; // We'll create this soon

function App() {
  const [notes, setNotes] = useState(() => {
    // Bonus: Load notes from localStorage on initial render
    const savedNotes = localStorage.getItem('quicknotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Bonus: Save notes to localStorage whenever the notes state changes
  useEffect(() => {
    localStorage.setItem('quicknotes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please enter both title and content for the note.');
      return;
    }
    const newNote = {
      id: Date.now(), // Unique ID for each note
      title: title,
      content: content,
    };
    setNotes([...notes, newNote]);
    setTitle(''); // Clear input fields
    setContent('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="app-container">
      <h1>QuickNotes 📝</h1>

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