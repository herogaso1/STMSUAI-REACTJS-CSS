import React, { useState } from "react";
// 1. Import thêm Outlet
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet, 
} from "react-router-dom";
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
import Profile from "./components/Profile";

// --- (CODE MỚI) IMPORT THÊM 2 TRANG ---
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
// --- KẾT THÚC CODE MỚI ---

import "./App.css";

// Layout chính - Dùng Outlet
const AppLayout = ({ onLogout, children }) => (
  <div className="app-layout">
    <Sidebar onLogout={onLogout} />
    <div className="main-content">
      <Header onLogout={onLogout} />
      <div className="content-area">
        {/* Truyền onLogout qua Outlet context */}
        <Outlet context={{ onLogout }} /> 
      </div>
    </div>
  </div>
);

// Layout cho các trang ngoài
const AuthLayout = ({ children }) => <div className="auth-layout">{children}</div>;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("user")
  );

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("role");
    localStorage.removeItem("user"); 
  };

  const userRole = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* 🌅 Trang Landing (công khai) */}
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

        {/* 🔑 Login (công khai) */}
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

        {/* 📝 Register (công khai) */}
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

        {/* --- (CODE MỚI) THÊM 2 ROUTE CHO QUÊN MẬT KHẨU --- */}
        {/* Trang Quên mật khẩu */}
        <Route
          path="/forgot-password"
          element={
            isLoggedIn ? ( // Nếu đã login thì quay về dashboard
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <ForgotPassword />
              </AuthLayout>
            )
          }
        />
        
        {/* Trang Đặt lại mật khẩu (có token trên URL) */}
        <Route
          path="/reset-password/:token" 
          element={
             isLoggedIn ? ( // Nếu đã login thì quay về dashboard
              <Navigate to="/dashboard" />
            ) : (
              <AuthLayout>
                <ResetPassword />
              </AuthLayout>
            )
          }
        />
        {/* --- KẾT THÚC CODE MỚI --- */}


        {/* 🧠 Dashboard riêng cho admin */}
        <Route
          path="/dashboard-admin"
          element={
            isLoggedIn && userRole === "admin" ? (
              <DashboardAdmin /> 
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ĐỊNH TUYẾN CHÍNH CHO USER (DÙNG LAYOUT) */}
        <Route
          path="/" 
          element={
            isLoggedIn && userRole === "user" ? (
              <AppLayout onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" /> 
            )
          }
        >
          {/* Các Route con */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<TaskBoard />} />
          <Route path="notes" element={<Notes />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="pomodoro" element={<Pomodoro />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
          <Route path="profile" element={<Profile />} />
          <Route path="workspaces" element={<div>Trang Workspaces</div>} />
          <Route path="study-room" element={<div>Trang Study Room</div>} />
          <Route index element={<Navigate to="/dashboard" />} />
        </Route> {/* Kết thúc Route cha */}


        {/* ❌ Route không tồn tại */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;