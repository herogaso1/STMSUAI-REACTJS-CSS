import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css"; // Dùng chung CSS
import loginArt from "../assets/DangNhap/login-art.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Thêm state loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Xóa lỗi khi người dùng bắt đầu nhập lại
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Bật loading
    const { email, password } = formData;

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      setLoading(false); // Tắt loading
      return;
    }

    // Kiểm tra admin (hardcoded)
    if (email === "admin" && password === "123456") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({ username: "Admin" })); // Thêm user cho admin
      onLoginSuccess();
      setLoading(false); // Tắt loading
      navigate("/dashboard-admin"); // Chuyển hướng admin
      return;
    }

    // Login user thường (Gọi API)
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("role", "user");
        localStorage.setItem("user", JSON.stringify(data.user)); // Lưu thông tin user
        onLoginSuccess();
        navigate("/dashboard"); // Chuyển hướng user
      } else {
        setError(data.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError("Không thể kết nối đến máy chủ!");
    } finally {
      setLoading(false); // Tắt loading
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <img src={loginArt} alt="Login Illustration" className="auth-img" />
        </div>

        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>

            <input
              type="text" // Có thể đổi thành "email"
              name="email"
              placeholder="Email"
              value={formData.email} // Thêm value để control input
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password} // Thêm value để control input
              onChange={handleChange}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>

            {/* --- (CODE MỚI) THÊM LINK QUÊN MẬT KHẨU --- */}
            <div className="auth-links">
              <p>
                Chưa có tài khoản?{" "}
                <a href="/register" className="auth-link">
                  Đăng ký
                </a>
              </p>
              <a href="/forgot-password" className="auth-link forgot-link">
                Quên mật khẩu?
              </a>
            </div>
            {/* --- KẾT THÚC CODE MỚI --- */}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;