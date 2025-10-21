import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "⏰",
      title: "Tập trung & Quản lý thời gian",
      description:
        "Pomodoro giúp bạn duy trì sự tập trung, xây dựng kỷ luật và hoàn thành mục tiêu từng bước một.",
    },
    {
      icon: "🧠",
      title: "Trí tuệ Nhân tạo hỗ trợ",
      description:
        "AI hiểu bạn, giúp bạn sắp xếp công việc thông minh, gợi ý thời gian học tối ưu và tự động hóa nhắc nhở.",
    },
    {
      icon: "📈",
      title: "Theo dõi tiến trình phát triển",
      description:
        "Biểu đồ và thống kê giúp bạn nhìn lại hành trình – mỗi ngày là một bước tiến gần hơn đến thành công.",
    },
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">Tập trung.</span> <br />
            <span className="hero-sub">Học tập. Phát triển bản thân.</span>
          </h1>
          <p className="hero-desc">
            Một không gian số giúp bạn sắp xếp công việc, học tập hiệu quả, và
            nuôi dưỡng kỷ luật cá nhân bằng Pomodoro và AI.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/login")}>
              🚀 Đăng nhập
            </button>
            <button className="btn-outline" onClick={() => navigate("/register")}>
              ✨ Đăng ký miễn phí
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <span className="badge">Tính năng chính</span>
          <h2>Ba Trụ Cột Giúp Bạn Duy Trì Động Lực</h2>
          <p>
            Kết hợp giữa công nghệ, tâm lý học và thiết kế — dành riêng cho người học và người làm việc hiện đại.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <div className="cta-box">
          <h2>Bắt đầu thay đổi thói quen học tập của bạn ngay hôm nay</h2>
          <p>
            Từng phút giây bạn tập trung hôm nay — là nền tảng cho phiên bản
            xuất sắc của bạn ngày mai.
          </p>
          <button className="btn-cta" onClick={() => navigate("/register")}>
            Bắt đầu miễn phí →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <h3>STMSUAL</h3>
            <p>All-in-one Study & Productivity Platform</p>
          </div>
          <div className="footer-links">
            <a href="#features">Tính năng</a>
            <a href="#contact">Liên hệ</a>
            <a href="#help">Hỗ trợ</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 STMSUAL — Hành trình học tập bắt đầu từ sự tập trung.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
