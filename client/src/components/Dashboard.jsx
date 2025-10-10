import React, { useState } from 'react';
import './Dashboard.css';
import { BsCheckCircleFill, BsCircle, BsFire, BsTrophy, BsClock, BsCalendar3, BsX, BsPlus, BsTrash } from 'react-icons/bs';
import { IoTrendingUp, IoFlash, IoClose } from 'react-icons/io5';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Tasks state management
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Hoàn thành bài tập React', deadline: '2 giờ', priority: 'high', completed: false },
    { id: 2, title: 'Đọc tài liệu NodeJS', deadline: 'Hôm nay', priority: 'medium', completed: false },
    { id: 3, title: 'Review code dự án', deadline: 'Mai', priority: 'low', completed: false },
    { id: 4, title: 'Meeting nhóm lúc 3PM', deadline: '4 giờ', priority: 'high', completed: false }
  ]);

  // Modal state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    deadline: '',
    priority: 'medium'
  });

  // Mock data - Dữ liệu demo
  const stats = {
    tasksCompleted: tasks.filter(t => t.completed).length,
    totalTasks: tasks.length,
    studyStreak: 7,
    pomodoroSessions: 8,
    weeklyGoal: 40,
    currentWeek: 28
  };

  const upcomingTasks = tasks.filter(t => !t.completed);

  const recentActivities = [
    { id: 1, text: 'Hoàn thành 4 Pomodoro sessions', time: '10 phút trước', icon: '✅' },
    { id: 2, text: 'Tham gia Study Room "Web Dev"', time: '1 giờ trước', icon: '📚' },
    { id: 3, text: 'Đạt mốc 7 ngày học liên tục', time: '2 giờ trước', icon: '🔥' },
    { id: 4, text: 'Chia sẻ note trong Community', time: '5 giờ trước', icon: '💡' }
  ];

  const motivationalQuotes = [
    "Mỗi ngày là một cơ hội mới để tiến bộ! 🌟",
    "Tập trung vào tiến độ, không phải hoàn hảo! 💪",
    "Bạn đã học được nhiều hơn bạn nghĩ! 🚀",
    "Kiên trì là chìa khóa thành công! 🔑"
  ];

  const [quote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  const completionRate = stats.totalTasks > 0 ? Math.round((stats.tasksCompleted / stats.totalTasks) * 100) : 0;
  const weeklyProgress = Math.round((stats.currentWeek / stats.weeklyGoal) * 100);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Task handlers
  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleCreateTask = () => {
    if (newTask.title.trim() && newTask.deadline.trim()) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        deadline: newTask.deadline,
        priority: newTask.priority,
        completed: false
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', deadline: '', priority: 'medium' });
      setShowTaskModal(false);
    }
  };

  const handleOpenTaskModal = () => {
    setShowTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setShowTaskModal(false);
    setNewTask({ title: '', deadline: '', priority: 'medium' });
  };

  return (
    <div className="dashboard">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1 className="welcome-title">Chào mừng trở lại, Minh! 👋</h1>
          <p className="welcome-subtitle">{quote}</p>
        </div>
        <div className="date-info">
          <BsCalendar3 className="calendar-icon" />
          <span>{currentTime.toLocaleDateString('vi-VN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {/* Tasks Completion */}
        <div className="stat-card tasks-card">
          <div className="stat-header">
            <div className="stat-icon tasks-icon">
              <BsCheckCircleFill />
            </div>
            <span className="stat-label">Công việc hôm nay</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.tasksCompleted}/{stats.totalTasks}</div>
            <div className="progress-bar">
              <div className="progress-fill tasks-progress" style={{ width: `${completionRate}%` }}></div>
            </div>
            <span className="stat-subtitle">{completionRate}% hoàn thành</span>
          </div>
        </div>

        {/* Study Streak */}
        <div className="stat-card streak-card">
          <div className="stat-header">
            <div className="stat-icon streak-icon">
              <BsFire />
            </div>
            <span className="stat-label">Chuỗi học tập</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.studyStreak} ngày</div>
            <div className="streak-indicator">
              {[...Array(7)].map((_, i) => (
                <div 
                  key={i} 
                  className={`streak-day ${i < stats.studyStreak ? 'active' : ''}`}
                />
              ))}
            </div>
            <span className="stat-subtitle">Tiếp tục phát huy! 🔥</span>
          </div>
        </div>

        {/* Pomodoro Sessions */}
        <div className="stat-card pomodoro-card">
          <div className="stat-header">
            <div className="stat-icon pomodoro-icon">
              <BsClock />
            </div>
            <span className="stat-label">Pomodoro hôm nay</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.pomodoroSessions}</div>
            <div className="pomodoro-time">
              <IoFlash className="flash-icon" />
              <span>{stats.pomodoroSessions * 25} phút tập trung</span>
            </div>
            <span className="stat-subtitle">+{stats.pomodoroSessions * 2} tomato 🍅</span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="stat-card goal-card">
          <div className="stat-header">
            <div className="stat-icon goal-icon">
              <BsTrophy />
            </div>
            <span className="stat-label">Mục tiêu tuần</span>
          </div>
          <div className="stat-content">
            <div className="stat-value">{stats.currentWeek}/{stats.weeklyGoal}h</div>
            <div className="progress-bar">
              <div className="progress-fill goal-progress" style={{ width: `${weeklyProgress}%` }}></div>
            </div>
            <span className="stat-subtitle">{weeklyProgress}% đạt được</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Upcoming Tasks */}
        <div className="content-card tasks-list-card">
          <div className="card-header">
            <h3 className="card-title">
              <IoTrendingUp className="title-icon" />
              Công việc sắp tới
            </h3>
            <button className="view-all-btn">Xem tất cả</button>
          </div>
          <div className="tasks-list">
            {upcomingTasks.length > 0 ? (
              upcomingTasks.map(task => (
                <div key={task.id} className="task-item">
                  <div 
                    className="task-checkbox"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.completed ? (
                      <BsCheckCircleFill className="checkbox-checked" />
                    ) : (
                      <BsCircle className="checkbox-unchecked" />
                    )}
                  </div>
                  <div className="task-info">
                    <p className="task-title">{task.title}</p>
                    <div className="task-meta">
                      <span 
                        className="task-priority"
                        style={{ backgroundColor: getPriorityColor(task.priority) }}
                      >
                        {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </span>
                      <span className="task-deadline">
                        <BsClock /> {task.deadline}
                      </span>
                    </div>
                  </div>
                  <button 
                    className="delete-task-btn"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <BsTrash />
                  </button>
                </div>
              ))
            ) : (
              <div className="empty-tasks">
                <p>Chưa có công việc nào</p>
              </div>
            )}
          </div>
          <button className="add-task-btn" onClick={handleOpenTaskModal}>
            <BsPlus className="plus-icon" /> Thêm công việc mới
          </button>
        </div>

        {/* Recent Activities */}
        <div className="content-card activities-card">
          <div className="card-header">
            <h3 className="card-title">
              <IoFlash className="title-icon" />
              Hoạt động gần đây
            </h3>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-info">
                  <p className="activity-text">{activity.text}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h3 className="section-title">Thao tác nhanh</h3>
        <div className="actions-grid">
          <button className="action-btn pomodoro-action">
            <BsClock className="action-icon" />
            <span>Bắt đầu Pomodoro</span>
          </button>
          <button className="action-btn task-action" onClick={handleOpenTaskModal}>
            <BsCheckCircleFill className="action-icon" />
            <span>Tạo công việc</span>
          </button>
          <button className="action-btn study-action">
            <BsFire className="action-icon" />
            <span>Tham gia Study Room</span>
          </button>
          <button className="action-btn ai-action">
            <IoFlash className="action-icon" />
            <span>Hỏi AI Assistant</span>
          </button>
        </div>
      </div>

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={handleCloseTaskModal}>
          <div className="modal-content task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Tạo công việc mới</h3>
              <button className="close-modal-btn" onClick={handleCloseTaskModal}>
                <IoClose />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="task-title">Tên công việc</label>
                <input
                  id="task-title"
                  type="text"
                  className="form-input"
                  placeholder="Nhập tên công việc..."
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-deadline">Thời hạn</label>
                <input
                  id="task-deadline"
                  type="text"
                  className="form-input"
                  placeholder="Ví dụ: 2 giờ, Hôm nay, Mai..."
                  value={newTask.deadline}
                  onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-priority">Độ ưu tiên</label>
                <div className="priority-options">
                  <button
                    className={`priority-btn ${newTask.priority === 'high' ? 'active' : ''}`}
                    style={{ borderColor: '#ef4444', color: newTask.priority === 'high' ? '#fff' : '#ef4444', backgroundColor: newTask.priority === 'high' ? '#ef4444' : 'transparent' }}
                    onClick={() => setNewTask({ ...newTask, priority: 'high' })}
                  >
                    Cao
                  </button>
                  <button
                    className={`priority-btn ${newTask.priority === 'medium' ? 'active' : ''}`}
                    style={{ borderColor: '#f59e0b', color: newTask.priority === 'medium' ? '#fff' : '#f59e0b', backgroundColor: newTask.priority === 'medium' ? '#f59e0b' : 'transparent' }}
                    onClick={() => setNewTask({ ...newTask, priority: 'medium' })}
                  >
                    Trung bình
                  </button>
                  <button
                    className={`priority-btn ${newTask.priority === 'low' ? 'active' : ''}`}
                    style={{ borderColor: '#10b981', color: newTask.priority === 'low' ? '#fff' : '#10b981', backgroundColor: newTask.priority === 'low' ? '#10b981' : 'transparent' }}
                    onClick={() => setNewTask({ ...newTask, priority: 'low' })}
                  >
                    Thấp
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={handleCloseTaskModal}>Hủy</button>
              <button 
                className="btn-create" 
                onClick={handleCreateTask}
                disabled={!newTask.title.trim() || !newTask.deadline.trim()}
              >
                Tạo công việc
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
