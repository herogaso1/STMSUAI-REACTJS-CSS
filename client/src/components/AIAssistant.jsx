import React, { useState } from 'react';
import './AIAssistant.css';

const AIAssistant = () => {
  const [inputValue, setInputValue] = useState('');

  // Quick actions
  const quickActions = [
    { id: 1, icon: '✍️', text: 'Tạo task' },
    { id: 2, icon: '📅', text: 'Lên lịch' },
    { id: 3, icon: '🎯', text: 'Ưu tiên' },
    { id: 4, icon: '💡', text: 'Gợi ý' }
  ];

  // Sample messages for UI display only
  const sampleMessages = [
    {
      id: 1,
      type: 'ai',
      text: 'Xin chào! 👋 Tôi có thể giúp bạn:\n\n• Tạo task nhanh\n• Phân tích công việc\n• Lên lịch thông minh\n• Gợi ý ưu tiên',
      time: '10:30'
    }
  ];

  return (
    <div className="ai-assistant">
      <div className="ai-container">
        {/* Header */}
        <div className="ai-header">
          <div className="ai-header-left">
            <div className="ai-icon">🤖</div>
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
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="chat-area">
          {sampleMessages.map(message => (
            <div key={message.id} className={`msg ${message.type}`}>
              <div className="msg-avatar">{message.type === 'ai' ? '🤖' : '👤'}</div>
              <div className="msg-body">
                <div className="msg-bubble">
                  <p>{message.text}</p>
                </div>
                <span className="msg-time">{message.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <input
            type="text"
            className="chat-input"
            placeholder="Nhập tin nhắn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            className="send-btn"
            disabled={!inputValue.trim()}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
