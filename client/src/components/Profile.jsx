import React from "react";
import "./Profile.css";
import avt from "../assets/Trangchu/avt.png"; // 🧩 import hình từ thư mục assets

const Profile = () => {
  // Dữ liệu user (tạm thời)
  const user = {
    name: "Minh Nguyen",
    email: "minh.nguyen@example.com",
    role: "Sinh viên",
    phone: "0987654321",
    class: "Lớp CS101 - Python cơ bản",
    joinDate: "12/08/2024",
    avatar: avt, // ✅ dùng ảnh import ở trên
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <img src={user.avatar} alt="avatar" className="profile-avatar" />
          <div>
            <h2>{user.name}</h2>
            <p>{user.role}</p>
          </div>
        </div>

        <div className="profile-info">
          <h3>Thông tin cá nhân</h3>
          <div className="info-item">
            <strong>Email:</strong>
            <span>{user.email}</span>
          </div>
          <div className="info-item">
            <strong>Số điện thoại:</strong>
            <span>{user.phone}</span>
          </div>
          <div className="info-item">
            <strong>Lớp:</strong>
            <span>{user.class}</span>
          </div>
          <div className="info-item">
            <strong>Ngày tham gia:</strong>
            <span>{user.joinDate}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="edit-btn">✏️ Chỉnh sửa thông tin</button>
          <button className="logout-btn">🚪 Đăng xuất</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
