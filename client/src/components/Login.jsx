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
    setError(""); // Xóa lỗi khi người dùng bắt đầu nhập lại
  };

  // 1. Biến hàm này thành "async" để dùng "await"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Xóa lỗi cũ
    const { email, password } = formData;

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    // ✅ Kiểm tra admin (Giữ lại logic cũ của bạn)
    if (email === "admin" && password === "123456") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify({ username: "Admin" })); // Thêm user cho admin
      onLoginSuccess();
      navigate("/dashboard");
      return;
    }

    // ✅ 2. Logic đăng nhập user thường (GỌI API)
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
        // Đăng nhập thành công
        localStorage.setItem("role", "user");
        // Lưu thông tin user vào localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); 
        onLoginSuccess();
        navigate("/dashboard");
      } else {
        // Sai tài khoản, mật khẩu hoặc lỗi server
        setError(data.message || "Đã xảy ra lỗi");
      }
    } catch (error) {
      // Lỗi mạng, không kết nối được server
      console.error("Lỗi đăng nhập:", error);
      setError("Không thể kết nối đến máy chủ!");
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
              type="text" // Đổi từ "text" thành "email" sẽ tốt hơn cho trình duyệt
              name="email"
              placeholder="Email" // Sửa placeholder
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