import React, { useState } from 'react';
import './Notes.css';
import { BsPlus, BsSearch, BsTrash, BsPencil, BsPin, BsPinFill, BsTag, BsThreeDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Học React Hooks',
      content: 'useState, useEffect, useContext là những hooks cơ bản cần nắm vững...',
      tags: ['React', 'Programming'],
      color: '#e0f2fe',
      pinned: true,
      date: '2025-10-08'
    },
    {
      id: 2,
      title: 'Danh sách mua sắm',
      content: '- Sách lập trình\n- Bàn phím cơ\n- Chuột gaming',
      tags: ['Shopping'],
      color: '#fef3c7',
      pinned: false,
      date: '2025-10-09'
    },
    {
      id: 3,
      title: 'Ý tưởng dự án',
      content: 'Xây dựng một ứng dụng quản lý thời gian học tập với AI...',
      tags: ['Ideas', 'Project'],
      color: '#dcfce7',
      pinned: true,
      date: '2025-10-10'
    },
    {
      id: 4,
      title: 'Meeting notes',
      content: 'Thảo luận về architecture của dự án, sử dụng microservices...',
      tags: ['Work', 'Meeting'],
      color: '#fecaca',
      pinned: false,
      date: '2025-10-07'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [],
    color: '#e0f2fe'
  });
  const [tagInput, setTagInput] = useState('');

  const colors = [
    { name: 'Blue', value: '#e0f2fe' },
    { name: 'Yellow', value: '#fef3c7' },
    { name: 'Green', value: '#dcfce7' },
    { name: 'Red', value: '#fecaca' },
    { name: 'Purple', value: '#e9d5ff' },
    { name: 'Pink', value: '#fce7f3' }
  ];

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.pinned);

  const handleCreateNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      const note = {
        id: Date.now(),
        ...newNote,
        pinned: false,
        date: new Date().toISOString().split('T')[0]
      };
      setNotes([note, ...notes]);
      setNewNote({ title: '', content: '', tags: [], color: '#e0f2fe' });
      setIsCreating(false);
      setTagInput('');
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    setSelectedNote(null);
  };

  const handleTogglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote({
        ...newNote,
        tags: [...newNote.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewNote({
      ...newNote,
      tags: newNote.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="notes-container">
      {/* Header */}
      <div className="notes-header">
        <div className="notes-header-top">
          <h1 className="notes-title">📝 Ghi chú của tôi</h1>
          <button className="create-note-btn" onClick={() => setIsCreating(true)}>
            <BsPlus /> Tạo ghi chú mới
          </button>
        </div>

        {/* Search Bar */}
        <div className="notes-search">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm ghi chú, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Notes Grid */}
      <div className="notes-content">
        {/* Pinned Notes */}
        {pinnedNotes.length > 0 && (
          <div className="notes-section">
            <h3 className="section-title">
              <BsPinFill className="section-icon" /> Đã ghim
            </h3>
            <div className="notes-grid">
              {pinnedNotes.map(note => (
                <div
                  key={note.id}
                  className="note-card"
                  style={{ backgroundColor: note.color }}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="note-card-header">
                    <h3 className="note-card-title">{note.title}</h3>
                    <button
                      className="pin-btn pinned"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePin(note.id);
                      }}
                    >
                      <BsPinFill />
                    </button>
                  </div>
                  <p className="note-card-content">{note.content}</p>
                  <div className="note-card-footer">
                    <div className="note-tags">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="note-tag">
                          <BsTag /> {tag}
                        </span>
                      ))}
                    </div>
                    <span className="note-date">{note.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Notes */}
        {unpinnedNotes.length > 0 && (
          <div className="notes-section">
            <h3 className="section-title">Ghi chú khác</h3>
            <div className="notes-grid">
              {unpinnedNotes.map(note => (
                <div
                  key={note.id}
                  className="note-card"
                  style={{ backgroundColor: note.color }}
                  onClick={() => setSelectedNote(note)}
                >
                  <div className="note-card-header">
                    <h3 className="note-card-title">{note.title}</h3>
                    <button
                      className="pin-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePin(note.id);
                      }}
                    >
                      <BsPin />
                    </button>
                  </div>
                  <p className="note-card-content">{note.content}</p>
                  <div className="note-card-footer">
                    <div className="note-tags">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="note-tag">
                          <BsTag /> {tag}
                        </span>
                      ))}
                    </div>
                    <span className="note-date">{note.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>Không tìm thấy ghi chú</h3>
            <p>Thử tìm kiếm với từ khóa khác hoặc tạo ghi chú mới</p>
          </div>
        )}
      </div>

      {/* Create Note Modal */}
      {isCreating && (
        <div className="modal-overlay" onClick={() => setIsCreating(false)}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Tạo ghi chú mới</h2>
              <button className="close-btn" onClick={() => setIsCreating(false)}>
                <IoClose />
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                placeholder="Tiêu đề..."
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="note-title-input"
              />

              <textarea
                placeholder="Nội dung ghi chú..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="note-content-input"
                rows={10}
              />

              {/* Tags Input */}
              <div className="tags-section">
                <div className="tags-input-wrapper">
                  <BsTag className="tag-icon" />
                  <input
                    type="text"
                    placeholder="Thêm tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="tag-input"
                  />
                  <button onClick={handleAddTag} className="add-tag-btn">Thêm</button>
                </div>
                <div className="tags-list">
                  {newNote.tags.map((tag, index) => (
                    <span key={index} className="tag-item">
                      {tag}
                      <button onClick={() => handleRemoveTag(tag)} className="remove-tag-btn">
                        <IoClose />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Color Picker */}
              <div className="color-picker">
                <label>Màu nền:</label>
                <div className="color-options">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      className={`color-option ${newNote.color === color.value ? 'active' : ''}`}
                      style={{ backgroundColor: color.value }}
                      onClick={() => setNewNote({ ...newNote, color: color.value })}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setIsCreating(false)}>
                Hủy
              </button>
              <button className="save-btn" onClick={handleCreateNote}>
                Lưu ghi chú
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View/Edit Note Modal */}
      {selectedNote && (
        <div className="modal-overlay" onClick={() => setSelectedNote(null)}>
          <div className="note-modal" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: selectedNote.color }}>
            <div className="modal-header">
              <h2>{selectedNote.title}</h2>
              <div className="modal-actions">
                <button className="icon-btn" onClick={() => handleTogglePin(selectedNote.id)}>
                  {selectedNote.pinned ? <BsPinFill /> : <BsPin />}
                </button>
                <button className="icon-btn" onClick={() => handleDeleteNote(selectedNote.id)}>
                  <BsTrash />
                </button>
                <button className="close-btn" onClick={() => setSelectedNote(null)}>
                  <IoClose />
                </button>
              </div>
            </div>

            <div className="modal-body">
              <div className="note-view-content">
                {selectedNote.content}
              </div>

              <div className="note-view-tags">
                {selectedNote.tags.map((tag, index) => (
                  <span key={index} className="note-tag">
                    <BsTag /> {tag}
                  </span>
                ))}
              </div>

              <div className="note-view-date">
                Tạo ngày: {selectedNote.date}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
