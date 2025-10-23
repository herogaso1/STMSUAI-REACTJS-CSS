import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import loginArt from "../assets/DangNhap/login-art.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Vui lòng nhập địa chỉ email hợp lệ!");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Thay thế bằng API call thực tế đến backend
      // const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });

      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Giả lập thành công
      setMessage(
        "Đã gửi link đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư!"
      );
      setEmail("");
      
      // Tự động chuyển về trang login sau 3 giây
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-left">
          <img src={loginArt} alt="Forgot Password Illustration" className="auth-img" />
        </div>

        <div className="auth-right">
          <form onSubmit={handleSubmit}>
            <h2>Quên mật khẩu</h2>
            <p className="forgot-password-description">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi link đặt lại mật khẩu
            </p>

            <input
              type="email"
              name="email"
              placeholder="Địa chỉ email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Đang gửi..." : "Gửi link đặt lại mật khẩu"}
            </button>

            <p>
              Nhớ mật khẩu?{" "}
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

export default ForgotPassword;
