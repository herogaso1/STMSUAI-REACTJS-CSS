import React, { useState } from 'react';
import TaskCard from './TaskCard';
import './TaskBoard.css';
import { BsPlus, BsThreeDots, BsSearch, BsX, BsTag } from 'react-icons/bs';
import { IoClose, IoSparkles } from 'react-icons/io5';

const TaskBoard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState('todo');
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignee: '',
    attachments: 0,
    comments: 0,
    flag: 'green',
    date: '',
    assignees: [1],
    tags: []
  });

  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To do',
      count: 3,
      tasks: [
        {
          id: 1,
          title: 'Mobile Wireframes',
          assignee: 'Viverna Diam',
          attachments: 3,
          comments: 0,
          flag: 'red',
          date: 'Apr 12',
          assignees: [1]
        },
        {
          id: 2,
          title: 'User Research',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Maecenas Lacus',
          attachments: 1,
          comments: 0,
          flag: 'green',
          date: 'Mar 4',
          assignees: [2, 3]
        },
        {
          id: 3,
          title: 'Client Call',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Eglit Integer',
          attachments: 0,
          comments: 0,
          flag: 'green',
          date: 'Apr 2',
          assignees: [1]
        }
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      count: 4,
      tasks: [
        {
          id: 4,
          title: 'Landing Page',
          assignee: 'Maecenas Lacus',
          attachments: 2,
          comments: 0,
          flag: 'green',
          date: 'Mar 8',
          assignees: [2, 3]
        },
        {
          id: 5,
          title: 'Annual Presentation',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Maecenas Lacus',
          attachments: 0,
          comments: 0,
          flag: 'yellow',
          date: 'Mar 15',
          assignees: [2, 3]
        },
        {
          id: 6,
          title: 'Icons',
          assignee: 'Eglit Integer',
          attachments: 0,
          comments: 0,
          flag: 'yellow',
          date: 'Apr 10',
          assignees: [1]
        },
        {
          id: 7,
          title: 'Onboarding Screens',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque ...',
          assignee: 'Maecenas Lacus',
          attachments: 1,
          comments: 0,
          flag: 'red',
          date: 'Mar 17',
          assignees: [1, 2, 3]
        }
      ]
    },
    {
      id: 'done',
      title: 'Done',
      count: 3,
      tasks: [
        {
          id: 8,
          title: 'Product Mockups',
          assignee: 'Viverna Diam',
          attachments: 0,
          comments: 0,
          flag: 'green',
          date: 'Mar 2',
          assignees: [1]
        },
        {
          id: 9,
          title: 'Workshop Ideas',
          assignee: 'Nullam Velit',
          attachments: 0,
          comments: 0,
          flag: 'yellow',
          date: 'Mar 4',
          assignees: [3]
        },
        {
          id: 10,
          title: 'Navigation',
          assignee: 'Maecenas Lacus',
          attachments: 0,
          comments: 0,
          flag: 'red',
          date: 'Mar 15',
          assignees: [2]
        }
      ]
    }
  ]);

  // Natural Language Processing
  const parseNaturalLanguage = (input) => {
    const parsed = {
      title: input,
      flag: 'green',
      date: '',
      tags: []
    };

    if (input.toLowerCase().includes('khẩn cấp') || input.toLowerCase().includes('urgent') || input.toLowerCase().includes('cao')) {
      parsed.flag = 'red';
    } else if (input.toLowerCase().includes('trung bình') || input.toLowerCase().includes('medium')) {
      parsed.flag = 'yellow';
    }

    const datePatterns = [
      { pattern: /hôm nay|today/i, value: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
      { pattern: /ngày mai|mai|tomorrow/i, value: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
      { pattern: /tuần sau|next week/i, value: 'Tuần sau' },
      { pattern: /(\d+)\/(\d+)/i, value: (match) => `${match[1]}/${match[2]}` }
    ];

    for (const { pattern, value } of datePatterns) {
      const match = input.match(pattern);
      if (match) {
        parsed.date = typeof value === 'function' ? value(match) : value;
        break;
      }
    }

    const tagMatches = input.match(/#[\w\u00C0-\u024F\u1E00-\u1EFF]+/g);
    if (tagMatches) {
      parsed.tags = tagMatches.map(tag => tag.substring(1));
    }

    let cleanTitle = input;
    if (parsed.tags.length > 0) {
      parsed.tags.forEach(tag => {
        cleanTitle = cleanTitle.replace(`#${tag}`, '');
      });
    }
    ['khẩn cấp', 'urgent', 'cao', 'trung bình', 'medium', 'thấp', 'low', 'hôm nay', 'ngày mai', 'tuần sau'].forEach(keyword => {
      cleanTitle = cleanTitle.replace(new RegExp(keyword, 'gi'), '');
    });
    
    parsed.title = cleanTitle.trim();
    return parsed;
  };

  const handleQuickCreate = () => {
    if (naturalLanguageInput.trim()) {
      const parsed = parseNaturalLanguage(naturalLanguageInput);
      const newTaskData = {
        id: Date.now(),
        title: parsed.title,
        description: '',
        assignee: parsed.tags[0] || 'New Task',
        attachments: 0,
        comments: 0,
        flag: parsed.flag,
        date: parsed.date,
        assignees: [1],
        tags: parsed.tags
      };
      
      const updatedColumns = columns.map(col => {
        if (col.id === selectedColumn) {
          return {
            ...col,
            tasks: [...col.tasks, newTaskData],
            count: col.tasks.length + 1
          };
        }
        return col;
      });
      
      setColumns(updatedColumns);
      setNaturalLanguageInput('');
      setShowCreateModal(false);
    }
  };

  const handleCreateTask = () => {
    if (newTask.title.trim()) {
      const taskData = {
        id: Date.now(),
        ...newTask,
        assignee: newTask.assignee || newTask.tags[0] || 'New Task'
      };
      
      const updatedColumns = columns.map(col => {
        if (col.id === selectedColumn) {
          return {
            ...col,
            tasks: [...col.tasks, taskData],
            count: col.tasks.length + 1
          };
        }
        return col;
      });
      
      setColumns(updatedColumns);
      setNewTask({
        title: '',
        description: '',
        assignee: '',
        attachments: 0,
        comments: 0,
        flag: 'green',
        date: '',
        assignees: [1],
        tags: []
      });
      setShowCreateModal(false);
    }
  };

  const handleEditTask = () => {
    if (editingTask && editingTask.title.trim()) {
      const updatedColumns = columns.map(col => ({
        ...col,
        tasks: col.tasks.map(task => 
          task.id === editingTask.id ? editingTask : task
        )
      }));
      
      setColumns(updatedColumns);
      setShowEditModal(false);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedColumns = columns.map(col => ({
      ...col,
      tasks: col.tasks.filter(task => task.id !== taskId),
      count: col.tasks.filter(task => task.id !== taskId).length
    }));
    
    setColumns(updatedColumns);
    setShowEditModal(false);
    setEditingTask(null);
  };

  const handleAddTag = (isEdit = false) => {
    if (currentTag.trim()) {
      if (isEdit && editingTask) {
        setEditingTask({
          ...editingTask,
          tags: [...(editingTask.tags || []), currentTag.trim()]
        });
      } else {
        setNewTask({
          ...newTask,
          tags: [...(newTask.tags || []), currentTag.trim()]
        });
      }
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagIndex, isEdit = false) => {
    if (isEdit && editingTask) {
      setEditingTask({
        ...editingTask,
        tags: (editingTask.tags || []).filter((_, i) => i !== tagIndex)
      });
    } else {
      setNewTask({
        ...newTask,
        tags: (newTask.tags || []).filter((_, i) => i !== tagIndex)
      });
    }
  };

  const openCreateModal = (columnId) => {
    setSelectedColumn(columnId);
    setShowCreateModal(true);
  };

  const openEditModal = (task) => {
    setEditingTask({ ...task, tags: task.tags || [] });
    setShowEditModal(true);
  };

  const filteredColumns = columns.map(col => ({
    ...col,
    tasks: col.tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    )
  }));

  return (
    <div className="taskboard-wrapper">
      {/* Header */}
      <div className="taskboard-top-header">
        <h1 className="taskboard-main-title">📋 Quản lý Công việc</h1>
        <div className="taskboard-search-bar">
          <BsSearch className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm công việc, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="task-board">
        {filteredColumns.map((column) => (
          <div key={column.id} className="task-column">
            <div className="column-header">
              <div className="column-title-wrapper">
                <h3 className="column-title">{column.title}</h3>
                <span className="column-count">{column.count}</span>
              </div>
              <div className="column-actions">
                <button 
                  className="column-btn add-btn" 
                  onClick={() => openCreateModal(column.id)}
                  title="Thêm công việc"
                >
                  <BsPlus />
                </button>
                <button className="column-btn menu-btn">
                  <BsThreeDots />
                </button>
              </div>
            </div>
            
            <div className="column-content">
              {column.tasks.map((task) => (
                <div key={task.id} onClick={() => openEditModal(task)}>
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Tạo công việc mới</h3>
              <button className="close-modal-btn" onClick={() => setShowCreateModal(false)}>
                <IoClose />
              </button>
            </div>

            <div className="modal-body">
              <div className="natural-input-section">
                <label className="form-label">
                  <IoSparkles className="sparkle-icon" />
                  Nhập nhanh bằng ngôn ngữ tự nhiên
                </label>
                <div className="natural-input-wrapper">
                  <input
                    type="text"
                    className="natural-input"
                    placeholder='VD: "Hoàn thành báo cáo khẩn cấp hôm nay #Design #Important"'
                    value={naturalLanguageInput}
                    onChange={(e) => setNaturalLanguageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleQuickCreate()}
                  />
                  <button className="quick-create-btn" onClick={handleQuickCreate}>
                    <IoSparkles /> Tạo nhanh
                  </button>
                </div>
                <p className="input-hint">
                  💡 Gợi ý: "hôm nay/ngày mai" cho deadline, "khẩn cấp/cao" (red), "trung bình" (yellow), "thấp" (green), "#tag"
                </p>
              </div>

              <div className="divider">
                <span>Hoặc nhập chi tiết</span>
              </div>

              <div className="form-group">
                <label>Tiêu đề công việc *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tiêu đề..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  className="form-textarea"
                  placeholder="Nhập mô tả công việc..."
                  rows="3"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Người phụ trách</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="VD: Nguyễn Văn A, Design Team, Marketing..."
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Độ ưu tiên</label>
                  <select
                    className="form-select"
                    value={newTask.flag}
                    onChange={(e) => setNewTask({ ...newTask, flag: e.target.value })}
                  >
                    <option value="green">🟢 Thấp</option>
                    <option value="yellow">🟡 Trung bình</option>
                    <option value="red">🔴 Cao</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="VD: Mar 20, Hôm nay..."
                    value={newTask.date}
                    onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input-wrapper">
                  <BsTag className="tag-icon" />
                  <input
                    type="text"
                    className="tag-input"
                    placeholder="Nhập tag và Enter..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(false))}
                  />
                  <button className="add-tag-btn" onClick={() => handleAddTag(false)}>
                    Thêm
                  </button>
                </div>
                {newTask.tags && newTask.tags.length > 0 && (
                  <div className="tags-list">
                    {newTask.tags.map((tag, index) => (
                      <div key={index} className="tag-item">
                        <span>{tag}</span>
                        <button
                          className="remove-tag-btn"
                          onClick={() => handleRemoveTag(index, false)}
                        >
                          <BsX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowCreateModal(false)}>
                Hủy
              </button>
              <button 
                className="btn-create" 
                onClick={handleCreateTask}
                disabled={!newTask.title.trim()}
              >
                Tạo công việc
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {showEditModal && editingTask && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Chỉnh sửa công việc</h3>
              <div className="modal-header-actions">
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteTask(editingTask.id)}
                  title="Xóa công việc"
                >
                  🗑️
                </button>
                <button className="close-modal-btn" onClick={() => setShowEditModal(false)}>
                  <IoClose />
                </button>
              </div>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Tiêu đề công việc *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tiêu đề..."
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  className="form-textarea"
                  placeholder="Nhập mô tả công việc..."
                  rows="3"
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Người phụ trách</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="VD: Nguyễn Văn A, Design Team, Marketing..."
                  value={editingTask.assignee || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, assignee: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Độ ưu tiên</label>
                  <select
                    className="form-select"
                    value={editingTask.flag}
                    onChange={(e) => setEditingTask({ ...editingTask, flag: e.target.value })}
                  >
                    <option value="green">🟢 Thấp</option>
                    <option value="yellow">🟡 Trung bình</option>
                    <option value="red">🔴 Cao</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="VD: Mar 20, Hôm nay..."
                    value={editingTask.date || ''}
                    onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Tags</label>
                <div className="tags-input-wrapper">
                  <BsTag className="tag-icon" />
                  <input
                    type="text"
                    className="tag-input"
                    placeholder="Nhập tag và Enter..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag(true))}
                  />
                  <button className="add-tag-btn" onClick={() => handleAddTag(true)}>
                    Thêm
                  </button>
                </div>
                {editingTask.tags && editingTask.tags.length > 0 && (
                  <div className="tags-list">
                    {editingTask.tags.map((tag, index) => (
                      <div key={index} className="tag-item">
                        <span>{tag}</span>
                        <button
                          className="remove-tag-btn"
                          onClick={() => handleRemoveTag(index, true)}
                        >
                          <BsX />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowEditModal(false)}>
                Hủy
              </button>
              <button 
                className="btn-save" 
                onClick={handleEditTask}
                disabled={!editingTask.title.trim()}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
