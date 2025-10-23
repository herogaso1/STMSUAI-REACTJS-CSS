import React, { useState, useEffect } from "react";
import "./Header.css";
import { BsBell, BsBellFill, BsSearch } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// --- (ĐÃ SỬA) ---
// 1. Thay đổi đường dẫn import sang ảnh con mèo
import defaultAvatar from "../assets/Trangchu/avt.png";
// --- KẾT THÚC SỬA ---

function Header({ onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();

  const [username, setUsername] = useState("User");

  // --- (ĐÃ SỬA) ---
  // 2. Sử dụng 'defaultAvatar' (ảnh con mèo) làm state mặc định
  const [avatar, setAvatar] = useState(defaultAvatar);
  // --- KẾT THÚC SỬA ---

  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const userData = JSON.parse(userString);
        
        setUsername(userData.username || "User");

        // --- (ĐÃ SỬA) ---
        // 3. Sử dụng 'defaultAvatar' (ảnh con mèo) làm ảnh dự phòng
        //    nếu CSDL (localStorage) không có avatar_url
        setAvatar(userData.avatar_url || defaultAvatar);
        // --- KẾT THÚC SỬA ---
      }
    } catch (e) {
      console.error("Lỗi khi đọc user từ localStorage:", e);
    }
  }, []);

  // Thông báo mẫu
  const notifications = [
    {
      id: 1,
      message: "Bạn có 3 tasks cần hoàn thành hôm nay",
      time: "5 phút trước",
      unread: true,
    },
    {
      id: 2,
      message: "Pomodoro session đã hoàn thành",
      time: "15 phút trước",
      unread: true,
    },
    {
      id: 3,
      message: "Deadline: Hoàn thành bài tập React",
      time: "1 giờ trước",
      unread: false,
    },
  ];

  return (
    <header className="header">
      {/* Left - User Profile */}
      <div className="header-left">
        <div
          className={`user-profile ${showUserMenu ? "active" : ""}`}
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          {/* 4. Thẻ <img> này giờ đã được đồng bộ chính xác */}
          <img src={avatar} alt="Avatar" className="user-avatar" />
          
          <div className="user-info">
            <span className="user-name">{username}</span>
            <IoMdArrowDropdown className="dropdown-icon" />
          </div>
        </div>

        {/* User Menu Dropdown */}
        {showUserMenu && (
          <div className="user-dropdown">
            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/profile");
                setShowUserMenu(false);
              }}
            >
              👤 Hồ sơ
            </div>
            <div
              className="dropdown-item"
              onClick={() => {
                navigate("/settings"); // Giả sử bạn có route /settings
                setShowUserMenu(false);
              }}
            >
              ⚙️ Cài đặt
            </div>
            <div className="dropdown-divider"></div>
            
            <div
              className="dropdown-item logout"
              onClick={() => {
                if (onLogout) {
                  onLogout();
                }
                navigate("/login");
                setShowUserMenu(false); 
              }}
            >
              🚪 Đăng xuất
            </div>
          </div>
        )}
      </div>

      {/* Center - Search */}
      <div className="header-center">
        <div className="header-search">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="search-input"
          />
        </div>
      </div>

      {/* Right - Notifications */}
      <div className="header-right">
        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            {showNotifications ? (
              <BsBellFill className="notification-icon active" />
            ) : (
              <BsBell className="notification-icon" />
            )}
            {notificationCount > 0 && (
              <span className="notification-badge">
                {notificationCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Thông báo</h3>
                <button
                  className="clear-btn"
                  onClick={() => setNotificationCount(0)}
                >
                  Xóa tất cả
                </button>
              </div>
              <div className="notification-list">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`notification-item ${
                      notif.unread ? "unread" : ""
                    }`}
                  >
                    <div className="notification-content">
                      <p className="notification-message">
                        {notif.message}
                      </p>
                      <span className="notification-time">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;