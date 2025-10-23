import React, { useState } from 'react';
// Import 'useParams' to get the token from the URL
import { useNavigate, useParams } from 'react-router-dom';
import './auth.css';
import loginArt from "../assets/DangNhap/login-art.png";

const ResetPassword = () => {
  const navigate = useNavigate();
  // Get the 'token' from the URL (e.g., /reset-password/TOKEN_HERE)
  const { token } = useParams();

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp!");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: token,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message + " Bạn sẽ được chuyển về trang Đăng nhập sau 3 giây.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Không thể kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <img src={loginArt} alt="Reset Password Illustration" className="auth-img" />
        </div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h2>Đặt lại mật khẩu</h2>

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu mới"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu mới"
              onChange={handleChange}
              required
            />

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading || message}>
              {loading ? "Đang lưu..." : "Lưu mật khẩu"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; // 👈 Make sure this line exists!