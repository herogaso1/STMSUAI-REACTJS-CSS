import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import DashboardAdmin from "./components/DashboardAdmin";
import TaskBoard from "./components/TaskBoard";
import Notes from "./components/Notes";
import Calendar from "./components/Calendar";
import Pomodoro from "./components/Pomodoro";
import AIAssistant from "./components/AIAssistant";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Profile from "./components/Profile"; // 👤 Thêm component Hồ sơ
import "./App.css";

// 🧩 Layout chính cho user sau khi đăng nhập
const AppLayout = ({ activeTab, setActiveTab, onLogout, children }) => (
  <div className="app-layout">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
    <div className="main-content">
      <Header />
      <div className="content-area">
        {children ? (
          children
        ) : (
          <>
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "tasks" && <TaskBoard />}
            {activeTab === "notes" && <Notes />}
            {activeTab === "calendar" && <Calendar />}
            {activeTab === "pomodoro" && <Pomodoro />}
            {activeTab === "ai" && <AIAssistant />}
          </>
        )}
      </div>
    </div>
  </div>
);

// 🪞 Layout cho các trang ngoài (login, register, landing)
const AuthLayout = ({ children }) => <div className="auth-layout">{children}</div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLoginSuccess = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("role");
  };

  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* 🌅 Trang Landing */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userRole === "admin" ? (
                <Navigate to="/dashboard-admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <AuthLayout>
                <LandingPage />
              </AuthLayout>
            )
          }
        />

        {/* 🔑 Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              userRole === "admin" ? (
                <Navigate to="/dashboard-admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <AuthLayout>
                <Login onLoginSuccess={handleLoginSuccess} />
              </AuthLayout>
            )
          }
        />

        {/* 📝 Register */}
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

        {/* 👤 Dashboard cho user */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn && userRole === "user" ? (
              <AppLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
              />
            ) : userRole === "admin" ? (
              <Navigate to="/dashboard-admin" />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 🧠 Dashboard riêng cho admin */}
        <Route
          path="/dashboard-admin"
          element={
            isLoggedIn && userRole === "admin" ? (
              <DashboardAdmin />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 👤 Trang hồ sơ */}
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <AppLayout
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
              >
                <Profile />
              </AppLayout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ❌ Route không tồn tại */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
