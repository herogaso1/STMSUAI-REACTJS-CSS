import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import TaskBoard from "./components/TaskBoard";
import Notes from "./components/Notes";
import Calendar from "./components/Calendar";
import Pomodoro from "./components/Pomodoro";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLandingDone, setIsLandingDone] = useState(false);
  const [activeTab, setActiveTab] = useState("landing");

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleGetStarted = () => {
    setIsLandingDone(true);
    setActiveTab("dashboard");
  };

  return (
    <Router>
      <div className="app">
        {/* Nếu chưa đăng nhập thì chỉ hiển thị Login / Register */}
        {!isLoggedIn ? (
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        ) : !isLandingDone ? (
          // Sau khi login -> hiện landing page
          <LandingPage onGetStarted={handleGetStarted} />
        ) : (
          // Sau khi bấm Get Started -> vào dashboard
          <>
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="main-content">
              <Header />
              <div className="content-area">
                {activeTab === "dashboard" && <Dashboard />}
                {activeTab === "tasks" && <TaskBoard />}
                {activeTab === "notes" && <Notes />}
                {activeTab === "calendar" && <Calendar />}
                {activeTab === "pomodoro" && <Pomodoro />}
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
