import React, { useState } from 'react';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);


  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    if (editingId !== null) {
      setNotes(
        notes.map((note) =>
          note.id === editingId
            ? { ...note, title, content, category }
            : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        content,
        category,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle('');
    setContent('');
    setCategory('General');
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  };

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
      setContent('');
      setCategory('General');
    }
  };

  const categories = ['All', ...new Set(notes.map((note) => note.category))];

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategoryFilter === 'All' || note.category === selectedCategoryFilter;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>

      <br></br>
      <h2>Simple Notes App</h2>

      <form onSubmit={handleSaveNote} style={{ marginBottom: '20px' }}>
        <div>
          <label>TITLE:  </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <br></br>
        <div>
          <label>Content of the Notes:  </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
        </div>
        <br></br>
        <div>
          <label>Category:  </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <br></br>
        <button type="submit">
          {editingId !== null ? '  Update Note  ' : '  Add Note  '}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setTitle('');
              setContent('');
              setCategory('General');
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <div>

        <label>Search by Category:  </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div>
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
            >
              <h4>{note.title}</h4>
              <small>Category: {note.category}</small>
              <p>{note.content}</p>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button
                onClick={() => handleDelete(note.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
