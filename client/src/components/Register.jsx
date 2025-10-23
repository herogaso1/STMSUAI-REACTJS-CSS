import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import loginArt from "../assets/DangNhap/login-art.png";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("🎉 Đăng ký thành công!");
        navigate("/login");
      } else {
        alert(`❌ Lỗi: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến server!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <img src={loginArt} alt="Register Illustration" className="auth-img" />
        </div>
        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h2>Đăng ký tài khoản</h2>
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
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
            <button type="submit">Đăng ký</button>
            <p>
              Đã có tài khoản?{" "}
              <a href="/login" className="auth-link">
                Đăng nhập
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
