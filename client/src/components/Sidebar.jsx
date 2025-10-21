import React from 'react';
import './Sidebar.css';
import dashboardIcon from '../assets/TaskManagement-icon/dashboard.svg';
import taskIcon from '../assets/TaskManagement-icon/task-default.svg';
import notesIcon from '../assets/TaskManagement-icon/task-default.svg'; // Temporary, replace with actual notes icon
import calendarIcon from '../assets/TaskManagement-icon/calendar.svg';
import pomodoroIcon from '../assets/TaskManagement-icon/pomodoro.svg';
import studyRoomIcon from '../assets/TaskManagement-icon/study-room.svg';
import workspacesIcon from '../assets/TaskManagement-icon/dashboard.svg'; // Temporary, replace with actual workspaces icon
import aiIcon from '../assets/TaskManagement-icon/search.svg'; // Temporary, using search icon for AI

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
    { id: 'tasks', label: 'Tasks', icon: taskIcon },
    { id: 'notes', label: 'Notes', icon: notesIcon },
    { id: 'calendar', label: 'Calendar', icon: calendarIcon },
    { id: 'pomodoro', label: 'Pomodoro', icon: pomodoroIcon },
    { id: 'ai', label: 'AI Assistant', icon: aiIcon },
    { id: 'workspaces', label: 'Workspaces', icon: workspacesIcon },
    { id: 'study-room', label: 'Study Room', icon: studyRoomIcon },
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <img src={item.icon} alt={item.label} className="sidebar-icon" />
            <span className="sidebar-label">{item.label}</span>
          </button>
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
