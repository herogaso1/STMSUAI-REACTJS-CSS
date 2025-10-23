import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; // Sử dụng chung style với Profile

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin!");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Thay thế bằng API call thực tế đến backend
      // const response = await fetch("http://localhost:5000/api/auth/change-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     currentPassword: formData.currentPassword,
      //     newPassword: formData.newPassword,
      //   }),
      // });

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Giả lập thành công
      setSuccess("Đổi mật khẩu thành công!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Tự động chuyển về dashboard sau 2 giây
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>🔐 Đổi mật khẩu</h1>
        <p>Cập nhật mật khẩu của bạn để bảo mật tài khoản</p>
      </div>

      <div className="profile-content">
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-section">
            <h3>Thông tin mật khẩu</h3>

            <div className="form-group">
              <label htmlFor="currentPassword">Mật khẩu hiện tại *</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu hiện tại"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Mật khẩu mới *</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu mới *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu mới"
                required
                disabled={isLoading}
              />
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="password-requirements">
              <p><strong>Yêu cầu mật khẩu:</strong></p>
              <ul>
                <li>Tối thiểu 6 ký tự</li>
                <li>Nên có chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                <li>Không sử dụng mật khẩu đã dùng trước đây</li>
              </ul>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/dashboard")}
              disabled={isLoading}
            >
              Hủy
            </button>
            <button type="submit" className="btn-save" disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Đổi mật khẩu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
