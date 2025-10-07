import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import Calendar from './components/Calendar';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');

  return (
    <div className="app">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-content">
        <Header />

        <div className="content-area">
          {activeTab === 'tasks' && <TaskBoard />}
          {activeTab === 'dashboard' && (
            <div className="placeholder">
              <h2>📊 Dashboard</h2>
              <p>Dashboard content coming soon...</p>
            </div>
          )}
          {activeTab === 'people' && (
            <div className="placeholder">
              <h2>👥 People</h2>
              <p>People management coming soon...</p>
            </div>
          )}
          {activeTab === 'calendar' && <Calendar />}
          {activeTab === 'study-room' && (
            <div className="placeholder">
              <h2>📚 Study Room</h2>
              <p>Study room feature coming soon...</p>
            </div>
          )}
          {activeTab === 'pomodoro' && (
            <div className="placeholder">
              <h2>⏱️ Pomodoro</h2>
              <p>Pomodoro timer coming soon...</p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="placeholder">
              <h2>📈 Reports</h2>
              <p>Reports and analytics coming soon...</p>
            </div>
          )}
          {activeTab === 'admin' && (
            <div className="placeholder">
              <h2>⚙️ Admin Panel</h2>
              <p>Admin panel coming soon...</p>
            </div>
          )}
          {activeTab === 'help' && (
            <div className="placeholder">
              <h2>❓ Help</h2>
              <p>Help and support coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
