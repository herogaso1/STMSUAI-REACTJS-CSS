import React, { useState, useEffect } from 'react';
import './Settings.css'; // Sẽ tạo file CSS này sau
import { BsMoonStarsFill, BsSunFill, BsBellFill, BsBellSlashFill } from 'react-icons/bs'; // Icons

const Settings = () => {
  // === STATE QUẢN LÝ CÀI ĐẶT ===
  // Lấy giá trị từ localStorage hoặc dùng mặc định
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'vi');
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    JSON.parse(localStorage.getItem('notificationsEnabled') || 'true')
  );

  // === LOGIC ĐỔI THEME ===
  useEffect(() => {
    // 1. Cập nhật class trên <body>
    document.body.className = theme; // Xóa class cũ, thêm class mới ('light' hoặc 'dark')
    // 2. Lưu lựa chọn vào localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Chạy lại khi 'theme' thay đổi

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // === LOGIC ĐỔI NGÔN NGỮ ===
  // (Đây là ví dụ đơn giản, thực tế nên dùng thư viện i18n)
  const handleLanguageChange = (event) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    // (Trong ứng dụng thật, bạn sẽ cần tải lại text hoặc dùng thư viện i18n)
    alert(`Ngôn ngữ đã đổi thành: ${newLang}. (Cần làm mới trang hoặc dùng i18n để thấy thay đổi)`);
  };

  // === LOGIC BẬT/TẮT THÔNG BÁO ===
  const toggleNotifications = () => {
    setNotificationsEnabled(prev => {
      const newState = !prev;
      localStorage.setItem('notificationsEnabled', JSON.stringify(newState));
      // (Trong ứng dụng thật, bạn sẽ gửi cài đặt này lên server)
      return newState;
    });
  };

  // Dữ liệu text đơn giản cho ví dụ ngôn ngữ
  const texts = {
    vi: {
      title: "Cài đặt",
      theme: "Giao diện",
      light: "Sáng",
      dark: "Tối",
      language: "Ngôn ngữ",
      notifications: "Thông báo",
      enabled: "Đã bật",
      disabled: "Đã tắt",
    },
    en: {
      title: "Settings",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      language: "Language",
      notifications: "Notifications",
      enabled: "Enabled",
      disabled: "Disabled",
    }
  };
  const currentTexts = texts[language] || texts['vi']; // Lấy text theo ngôn ngữ

  return (
    <div className="settings-container">
      <h1>{currentTexts.title}</h1>

      {/* --- Cài đặt Giao diện --- */}
      <div className="setting-section">
        <h2>{currentTexts.theme}</h2>
        <div className="theme-toggle">
          <button
            onClick={() => setTheme('light')}
            className={`theme-btn light-btn ${theme === 'light' ? 'active' : ''}`}
            aria-label="Light theme"
          >
            <BsSunFill /> {currentTexts.light}
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`theme-btn dark-btn ${theme === 'dark' ? 'active' : ''}`}
            aria-label="Dark theme"
          >
            <BsMoonStarsFill /> {currentTexts.dark}
          </button>
        </div>
      </div>

      {/* --- Cài đặt Ngôn ngữ --- */}
      <div className="setting-section">
        <h2>{currentTexts.language}</h2>
        <select value={language} onChange={handleLanguageChange} className="language-select">
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
          {/* (Thêm các ngôn ngữ khác nếu cần) */}
        </select>
      </div>

      {/* --- Cài đặt Thông báo --- */}
      <div className="setting-section">
        <h2>{currentTexts.notifications}</h2>
        <button
          onClick={toggleNotifications}
          className={`toggle-btn ${notificationsEnabled ? 'active' : ''}`}
        >
          {notificationsEnabled ? <BsBellFill /> : <BsBellSlashFill />}
          {notificationsEnabled ? currentTexts.enabled : currentTexts.disabled}
        </button>
      </div>

    </div>
  );
};

export default Settings;