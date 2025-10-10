import React from 'react';
import './LandingPage.css';
import bg1Image from '../assets/Trangchu/bg1.jpg';
import bg2Image from '../assets/Trangchu/bg2.jpg';
import sky1Image from '../assets/Trangchu/sky1.jpg';
import sky2Image from '../assets/Trangchu/sky2.jpg';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: "📚",
      title: "Quản lý Công việc & Thời gian",
      description: "Tổ chức công việc thông minh với kỹ thuật Pomodoro, tối ưu hóa thời gian học tập và nghỉ ngơi hiệu quả.",
      tools: ["Tasks Manager", "Notes", "Pomodoro Timer", "Focus Mode"]
    },
    {
      icon: "🤝",
      title: "Hợp tác & Cộng đồng",
      description: "Kết nối với bạn bè, học nhóm trực tuyến, chia sẻ kiến thức và cùng nhau tiến bộ mỗi ngày.",
      tools: ["Study Room", "Livestream", "Workspaces", "Community"]
    },
    {
      icon: "🤖",
      title: "Trí tuệ Nhân tạo (AI)",
      description: "AI hỗ trợ lên lịch thông minh, tự động phân loại công việc và đảm bảo môi trường học tập an toàn.",
      tools: ["AI Assistant", "Smart Scheduling", "Content Analysis", "NLP Support"]
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${bg1Image})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>Trusted by 10,000+ Students</span>
          </div>
          <h1 className="hero-title">
            <span className="hero-main-title">Your Journey to</span>
            <span className="gradient-text">Success Starts Here</span>
          </h1>
          <p className="hero-description">
            Nền tảng học tập và quản lý công việc toàn diện với công nghệ AI - 
            Giúp bạn tập trung hơn, làm việc hiệu quả hơn và đạt mục tiêu nhanh hơn.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onGetStarted}>
              <span>Bắt đầu ngay</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary">
              <span className="play-icon">▶</span>
              <span>Xem Demo</span>
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Tasks Completed</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">4.9★</span>
              <span className="stat-label">User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" style={{ backgroundImage: `url(${sky1Image})` }}>
        <div className="features-overlay"></div>
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2>Ba Trụ Cột Thành Công</h2>
          <p>Giải pháp toàn diện được thiết kế đặc biệt cho học sinh và sinh viên</p>
        </div>
        
        <div className="features-container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-tools">
                  {feature.tools.map((tool, idx) => (
                    <span key={idx} className="tool-tag">
                      <span className="tool-dot"></span>
                      {tool}
                    </span>
                  ))}
                </div>
                <button className="feature-btn">
                  <span>Tìm hiểu thêm</span>
                  <span className="btn-arrow">→</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section" style={{ backgroundImage: `url(${bg2Image})` }}>
        <div className="benefits-overlay"></div>
        <div className="benefits-container">
          <div className="benefits-content">
            <span className="section-badge light">Why Choose Us</span>
            <h2>Tại sao chọn STMSUAL?</h2>
            <p className="benefits-intro">
              Chúng tôi kết hợp công nghệ AI tiên tiến với thiết kế tối ưu để mang đến 
              trải nghiệm học tập và làm việc tốt nhất cho bạn.
            </p>
            
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <span className="benefit-icon">🚀</span>
                </div>
                <h4>Tăng hiệu suất 3x</h4>
                <p>Pomodoro Timer và Focus Mode giúp bạn tập trung tối đa, hoàn thành công việc nhanh hơn</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <span className="benefit-icon">🧠</span>
                </div>
                <h4>AI thông minh</h4>
                <p>Lên lịch tự động, gợi ý ưu tiên và phân tích tiến độ học tập của bạn</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <span className="benefit-icon">�</span>
                </div>
                <h4>Cộng đồng sôi động</h4>
                <p>Học cùng bạn bè qua Study Room, Livestream và chia sẻ kiến thức</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <span className="benefit-icon">📊</span>
                </div>
                <h4>Theo dõi chi tiết</h4>
                <p>Dashboard trực quan với báo cáo và thống kê tiến độ đầy đủ</p>
              </div>

              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <span className="benefit-icon">�</span>
                </div>
                <h4>Bảo mật tuyệt đối</h4>
                <p>Dữ liệu được mã hóa và bảo vệ với tiêu chuẩn bảo mật cao nhất</p>
              </div>
              
              <div className="benefit-card">
                <div className="benefit-icon-box">
                  <span className="benefit-icon">⚡</span>
                </div>
                <h4>Tốc độ nhanh</h4>
                <p>Giao diện mượt mà, tải nhanh và phản hồi tức thì mọi thao tác</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" style={{ backgroundImage: `url(${sky2Image})` }}>
        <div className="testimonials-overlay"></div>
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2>Học sinh nói gì về chúng tôi?</h2>
          <p>Hàng ngàn học sinh đã thay đổi cách học tập và làm việc với STMSUAL</p>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">NA</div>
              <div className="testimonial-info">
                <strong>Nguyễn Minh Anh</strong>
                <span>Học sinh lớp 11</span>
              </div>
            </div>
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Từ khi dùng STMSUAL, mình đã hoàn thành nhiều bài tập hơn và điểm số cải thiện rõ rệt. 
              Pomodoro Timer thực sự giúp mình tập trung!"
            </p>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">TL</div>
              <div className="testimonial-info">
                <strong>Trần Hoàng Long</strong>
                <span>Sinh viên năm 2</span>
              </div>
            </div>
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "Study Room là tính năng yêu thích của mình. Học cùng bạn bè online giúp mình có động lực 
              hơn rất nhiều!"
            </p>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-avatar">LH</div>
              <div className="testimonial-info">
                <strong>Lê Thu Hà</strong>
                <span>Học sinh lớp 12</span>
              </div>
            </div>
            <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              "AI Assistant giúp mình tự động lên lịch học tập rất thông minh. Không còn lo quên deadline nữa!"
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <span className="cta-badge">
              <span className="badge-pulse"></span>
              Get Started Today
            </span>
            <h2>Sẵn sàng chinh phục mục tiêu của bạn?</h2>
            <p>
              Tham gia cùng hàng ngàn học sinh đã thay đổi cách học tập và làm việc. 
              Bắt đầu miễn phí ngay hôm nay, không cần thẻ tín dụng.
            </p>
            <div className="cta-buttons">
              <button className="btn-primary-large" onClick={onGetStarted}>
                <span>Đăng ký miễn phí</span>
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary-outline">
                <span>Liên hệ Sales</span>
              </button>
            </div>
            <div className="cta-features">
              <div className="cta-feature-item">
                <span className="check-icon">✓</span>
                <span>Miễn phí mãi mãi</span>
              </div>
              <div className="cta-feature-item">
                <span className="check-icon">✓</span>
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="cta-feature-item">
                <span className="check-icon">✓</span>
                <span>Thiết lập trong 2 phút</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>STMSUAL</h3>
            <p>All-in-one Study & Productivity Platform</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Sản phẩm</h4>
              <a href="#features">Tính năng</a>
              <a href="#pricing">Giá cả</a>
              <a href="#updates">Cập nhật</a>
            </div>
            <div className="footer-column">
              <h4>Cộng đồng</h4>
              <a href="#blog">Blog</a>
              <a href="#forum">Diễn đàn</a>
              <a href="#events">Sự kiện</a>
            </div>
            <div className="footer-column">
              <h4>Hỗ trợ</h4>
              <a href="#help">Trợ giúp</a>
              <a href="#contact">Liên hệ</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 STMSUAL. All rights reserved. Made with ❤️ for students.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
