import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import loginArt from "../assets/DangNhap/login-art.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // ✅ Kiểm tra admin
    if (email === "admin" && password === "123456") {
      localStorage.setItem("role", "admin");
      onLoginSuccess();
      navigate("/dashboard");
      return;
    }

    // ✅ User thường
    if (email && password) {
      localStorage.setItem("role", "user");
      onLoginSuccess();
      navigate("/dashboard");
    } else {
      setError("Vui lòng nhập đầy đủ thông tin!");
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
              type="text"
              name="email"
              placeholder="Tên đăng nhập hoặc email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={handleChange}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Đăng nhập</button>

            <p>
              Chưa có tài khoản?{" "}
              <a href="/register" className="auth-link">
                Đăng ký
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
