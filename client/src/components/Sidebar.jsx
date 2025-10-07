import React from 'react';
import './Sidebar.css';
import dashboardIcon from '../assets/TaskManagement-icon/dashboard.svg';
import peopleIcon from '../assets/TaskManagement-icon/people.svg';
import taskIcon from '../assets/TaskManagement-icon/task-default.svg';
import calendarIcon from '../assets/TaskManagement-icon/calendar.svg';
import studyRoomIcon from '../assets/TaskManagement-icon/study-room.svg';
import pomodoroIcon from '../assets/TaskManagement-icon/pomodoro.svg';
import reportIcon from '../assets/TaskManagement-icon/report.svg';
import adminIcon from '../assets/TaskManagement-icon/Admin Panel.svg';
import helpIcon from '../assets/TaskManagement-icon/help.svg';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: dashboardIcon },
    { id: 'people', label: 'People', icon: peopleIcon },
    { id: 'tasks', label: 'Tasks', icon: taskIcon },
    { id: 'calendar', label: 'Calendar', icon: calendarIcon },
    { id: 'study-room', label: 'Study Room', icon: studyRoomIcon },
    { id: 'pomodoro', label: 'Pomodoro', icon: pomodoroIcon },
    { id: 'reports', label: 'Reports', icon: reportIcon },
    { id: 'admin', label: 'Admin Panel', icon: adminIcon },
    { id: 'help', label: 'Help', icon: helpIcon },
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
