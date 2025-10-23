import React from 'react';
import './Sidebar.css';
import dashboardIcon from '../assets/TaskManagement-icon/dashboard.svg';
import taskIcon from '../assets/TaskManagement-icon/task-default.svg';
import notesIcon from '../assets/TaskManagement-icon/task-default.svg';
import calendarIcon from '../assets/TaskManagement-icon/calendar.svg';
import pomodoroIcon from '../assets/TaskManagement-icon/pomodoro.svg';
import studyRoomIcon from '../assets/TaskManagement-icon/study-room.svg';
import workspacesIcon from '../assets/TaskManagement-icon/dashboard.svg';
import aiIcon from '../assets/TaskManagement-icon/search.svg';

// 1. Import thêm 'Link' và 'useLocation' từ React Router
import { Link, useLocation } from 'react-router-dom';

// 2. Xóa props 'activeTab' và 'setActiveTab' vì chúng ta sẽ dùng router
const Sidebar = () => {
  // 3. Lấy URL hiện tại từ router
  const location = useLocation();

  // 4. Thêm thuộc tính 'path' (đường dẫn URL) cho mỗi mục
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon, path: '/dashboard' },
    { id: 'tasks', label: 'Tasks', icon: taskIcon, path: '/tasks' },
    { id: 'notes', label: 'Notes', icon: notesIcon, path: '/notes' },
    { id: 'calendar', label: 'Calendar', icon: calendarIcon, path: '/calendar' },
    { id: 'pomodoro', label: 'Pomodoro', icon: pomodoroIcon, path: '/pomodoro' },
    { id: 'ai', label: 'AI Assistant', icon: aiIcon, path: '/ai-assistant' },
    { id: 'workspaces', label: 'Workspaces', icon: workspacesIcon, path: '/workspaces' },
    { id: 'study-room', label: 'Study Room', icon: studyRoomIcon, path: '/study-room' },
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          // 5. Thay thế <button> bằng component <Link>
          <Link
            key={item.id}
            to={item.path} // 6. 'to' chỉ định URL đích khi nhấn vào
            // 7. Tự động highlight tab active bằng cách so sánh URL
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            // 8. Xóa onClick
          >
            <img src={item.icon} alt={item.label} className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
      
      <div className="sidebar-logo">
        <h2>STMSUAL</h2>
        <p className="version">Version: 1.0.0.11</p>
      </div>
    </div>
  );
};

export default Sidebar;