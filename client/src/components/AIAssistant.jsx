import React, { useState, useRef, useEffect } from 'react';
import './AIAssistant.css';
import aiLogo from '../assets/Trangchu/art8.png';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Trợ thủ MIMI ChatBot xin chào! 👋 Tôi có thể giúp bạn:\n• Tạo task nhanh\n• Phân tích công việc\n• Lên lịch thông minh\n• Hãy cho tôi biết bạn cần trợ giúp gì!',
      time: getTime()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  function getTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.reply || 'Xin lỗi, tôi chưa hiểu 😅',
        time: getTime()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 2, sender: 'ai', text: '⚠️ Server không phản hồi', time: getTime() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const quickActions = [
    { id: 1, icon: '✍️', text: 'Tạo task' },
    { id: 2, icon: '📅', text: 'Lên lịch' },
    { id: 3, icon: '🎯', text: 'Ưu tiên' },
    { id: 4, icon: '💡', text: 'Gợi ý' }
  ];

  return (
    <div className="ai-assistant">
      <div className="ai-container">
        {/* Header */}
        <div className="ai-header">
          <div className="ai-header-left">
            <div className="ai-icon">
              <img src={aiLogo} alt="AI Icon" className="ai-logo" />
            </div>
            <div>
              <h2>AI Assistant</h2>
              <p>Trợ lý quản lý công việc</p>
            </div>
          </div>
          <div className="ai-status">
            <span className="status-dot"></span>
            <span>Đang hoạt động</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {quickActions.map(action => (
            <button
              key={action.id}
              className="quick-btn"
              onClick={() => sendMessage(action.text)}
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="chat-area">
          {messages.map(msg => (
            <div key={msg.id} className={`msg ${msg.sender}`}>
              <div className="msg-avatar">
                {msg.sender === 'ai' ? (
                  <img src={aiLogo} alt="AI Avatar" className="avatar-img" />
                ) : (
                  '👤'
                )}
              </div>
              <div className="msg-body">
                <div className="msg-bubble">
                  <p>{msg.text}</p>
                </div>
                <span className="msg-time">{msg.time}</span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="msg ai">
              <div className="msg-avatar">
                <img src={aiLogo} alt="AI Avatar" className="avatar-img" />
              </div>
              <div className="msg-body">
                <div className="msg-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Nhập tin nhắn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="send-btn"
            disabled={!inputValue.trim() || loading}
            onClick={() => sendMessage(inputValue)}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
