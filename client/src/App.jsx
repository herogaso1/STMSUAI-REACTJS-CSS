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

// 🧩 Layout tách biệt cho phần chính sau khi đăng nhập
const AppLayout = ({ activeTab, setActiveTab, onLogout }) => (
  <div className="app-layout">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
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
  </div>
);

// 🪞 Layout cho các trang ngoài (login, register, landing)
const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    {children}
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>

        {/* 🌅 Landing Page */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <LandingPage />
              </AuthLayout>
            )
          }
        />

        {/* 🔑 Login / Register */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <Login onLoginSuccess={handleLoginSuccess} />
              </AuthLayout>
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <Register />
              </AuthLayout>
            )
          }
        />

        {/* 🧭 Dashboard sau khi login */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <AppLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Route sai → quay về Landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
