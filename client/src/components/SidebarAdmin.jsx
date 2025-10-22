import React from "react";
import "./Sidebar.css"; // dùng lại CSS sidebar hiện có

const SidebarAdmin = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Admin Panel</h2>
      <ul className="sidebar-menu">
        <li
          className={activeTab === "manageUsers" ? "active" : ""}
          onClick={() => setActiveTab("manageUsers")}
        >
          👥 Quản lý người dùng
        </li>
        <li
          className={activeTab === "manageClasses" ? "active" : ""}
          onClick={() => setActiveTab("manageClasses")}
        >
          🏫 Quản lý lớp học
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
