import React, { useState, useEffect } from "react";
// 1. (CODE MỚI) Import thêm useNavigate và useOutletContext
import { useNavigate, useOutletContext } from "react-router-dom";
import "./Profile.css";
import avt from "../assets/Trangchu/avt.png"; // Avatar mặc định
// import './Modal.css'; 

// Hàm định dạng ngày
const formatDate = (isoString) => {
  if (!isoString) {
    return "Không rõ"; 
  }
  try {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Lỗi định dạng ngày:", e);
    return isoString; 
  }
};

const Profile = () => {
  // --- 2. (CODE MỚI) Lấy hàm onLogout từ App.jsx và hook navigate ---
  const { onLogout } = useOutletContext();
  const navigate = useNavigate();
  // --- KẾT THÚC CODE MỚI ---

  const [user, setUser] = useState({
    name: "User",
    email: "email@example.com",
    role: "Sinh viên",
    joinDate: "...", 
    avatar: avt, 
  });

  // (State cho modal và form... giữ nguyên)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [avatarFile, setAvatarFile] = useState(null); 
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalError, setModalError] = useState("");

  // useEffect (Lấy dữ liệu user... giữ nguyên)
  useEffect(() => {
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const storedUser = JSON.parse(userString);
        setUser(prevState => ({
          ...prevState,
          name: storedUser.username || prevState.name,
          email: storedUser.email || prevState.email,
          avatar: storedUser.avatar_url || prevState.avatar,
          joinDate: formatDate(storedUser.created_at) || prevState.joinDate
        }));
      }
    } catch (e) {
      console.error("Lỗi khi đọc user từ localStorage:", e);
    }
  }, []); 

  // (Các hàm xử lý modal và form... giữ nguyên)
  const handleOpenModal = () => {
    setFormData({ 
      name: user.name,
      email: user.email,
    });
    setAvatarFile(null);
    setAvatarPreview(null);
    setModalError("");
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file); 
      setAvatarPreview(URL.createObjectURL(file));
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setModalError("");

    let storedUser;
    try {
      storedUser = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      setModalError("Lỗi dữ liệu đăng nhập. Vui lòng đăng nhập lại.");
      setIsLoading(false);
      return;
    }
    if (!storedUser || !storedUser.user_id) {
      setModalError("Lỗi: Không tìm thấy ID. Vui lòng đăng nhập lại.");
      setIsLoading(false);
      return;
    }
    const dataToSend = new FormData();
    dataToSend.append('user_id', storedUser.user_id);
    dataToSend.append('username', formData.name);
    dataToSend.append('email', formData.email);
    if (avatarFile) {
      dataToSend.append('avatar_file', avatarFile);
    }
    try {
      const res = await fetch("http://localhost:5000/api/profile/update", {
        method: "POST",
        body: dataToSend
      });
      const data = await res.json();
      if (res.ok) {
        setUser(prevState => ({
          ...prevState,
          name: data.user.username,
          email: data.user.email,
          avatar: data.user.avatar_url || prevState.avatar,
          joinDate: formatDate(data.user.created_at) || prevState.joinDate
        }));
        localStorage.setItem("user", JSON.stringify(data.user)); 
        setIsLoading(false);
        handleCloseModal();
      } else {
        setModalError(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      setModalError("Không thể kết nối đến server. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };
  // --- KẾT THÚC HÀM CŨ ---


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
            <strong>Ngày tham gia:</strong>
            <span>{user.joinDate}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button className="edit-btn" onClick={handleOpenModal}>
            ✏️ Chỉnh sửa thông tin
          </button>
          
          {/* --- 3. (CODE MỚI) THÊM onClick CHO NÚT ĐĂNG XUẤT --- */}
          <button 
            className="logout-btn"
            onClick={() => {
              // Gọi hàm onLogout (từ App.jsx) để xóa localStorage
              if (onLogout) {
                onLogout();
              }
              // Chuyển hướng về trang login
              navigate("/login");
            }}
          >
            🚪 Đăng xuất
          </button>
          {/* --- KẾT THÚC CODE MỚI --- */}
        </div>
      </div>

      {/* === MODAL CHỈNH SỬA THÔNG TIN (Giữ nguyên) === */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Chỉnh sửa hồ sơ</h2>
              <button onClick={handleCloseModal} className="close-btn">
                &times;
              </button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                {modalError && <p className="modal-error">{modalError}</p>}
                <div className="form-group avatar-upload-group">
                  <label>Ảnh đại diện</label>
                  <div className="avatar-preview-container">
                    <img 
                      src={avatarPreview || user.avatar} 
                      alt="Avatar preview" 
                      className="avatar-preview"
                    />
                    <input
                      type="file"
                      id="avatarFile"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="avatarFile" className="btn-change-avatar">
                      Đổi ảnh
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Tên hiển thị</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCloseModal}
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button 
                  type="submit" 
                  className="btn-save"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;