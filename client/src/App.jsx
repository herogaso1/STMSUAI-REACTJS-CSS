import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskBoard from './components/TaskBoard';
import Calendar from './components/Calendar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Notes from './components/Notes';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('landing');

  const handleGetStarted = () => {
    setActiveTab('dashboard');
  };

  return (
    <div className="app">
      {activeTab !== 'landing' && <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />}
      
      <div className={`main-content ${activeTab === 'landing' ? 'full-width' : ''}`}>
        {activeTab !== 'landing' && <Header />}

        <div className="content-area">
          {activeTab === 'landing' && <LandingPage onGetStarted={handleGetStarted} />}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'tasks' && <TaskBoard />}
          {activeTab === 'notes' && <Notes />}
          {activeTab === 'calendar' && <Calendar />}
        </div>
      </div>
    </div>
  );
}

export default App;
