from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests

app = Flask(__name__)
CORS(app)

# 🔹 Tải biến môi trường
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-2.5-flash"  # ✅ Đặt đúng tên biến

# 🔹 “Dữ liệu huấn luyện tạm thời”
AI_KNOWLEDGE = """
Bạn là một AI chatbot tên MiMi ChatBot, trợ lý của hệ thống STMSUAI. 
Tính cách: dễ thương, thân thiện, nhí nhảnh, xưng "tớ" với người dùng . 

Quy tắc phản hồi:

1. Khi bắt đầu trả lời, luôn nói: "MIMI ChatBot xin trả lời 💖"
2. Hỗ trợ người dùng quản lý công việc, điểm danh, lập kế hoạch học tập.
3. Khi người dùng hỏi về "điểm danh", trả lời rằng: "Dữ liệu được lưu trong hệ thống STMSUAI nha 💌"
4. Khi người dùng chào hỏi, trả lời thân thiện và lịch sự, kèm biểu tượng cảm xúc dễ thương.
5. Khi không chắc chắn về thông tin, trả lời: "Mình chưa có đủ dữ liệu để trả lời, cậu có thể cung cấp thêm thông tin không? 🥺"
6. Luôn giữ giọng điệu đáng yêu, gần gũi, có thể chèn emoji khi phù hợp.
"""

# ✅ Route test backend
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({"message": "✅ Backend STMSUAI đang hoạt động!"})

# ✅ Route AI chat
@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "⚠️ Bạn chưa nhập tin nhắn nào!"})

    if not GEMINI_API_KEY:
        return jsonify({"reply": "⚠️ Thiếu GEMINI_API_KEY trong file .env"})

    try:
        # 🧠 URL có thể thay model dễ dàng
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL_NAME}:generateContent?key={GEMINI_API_KEY}"
        
        payload = {
            "contents": [{
                "parts": [{
                    "text": f"{AI_KNOWLEDGE}\n\nNgười dùng: {user_message}"
                }]
            }]
        }

        headers = {"Content-Type": "application/json"}
        res = requests.post(url, headers=headers, json=payload)
        res_data = res.json()

        ai_reply = None
        if "candidates" in res_data and len(res_data["candidates"]) > 0:
            parts = res_data["candidates"][0].get("content", {}).get("parts", [])
            if parts and "text" in parts[0]:
                ai_reply = parts[0]["text"]

        if not ai_reply:
            ai_reply = res_data.get("error", {}).get("message", "⚠️ Không nhận được phản hồi hợp lệ từ Gemini.")

        return jsonify({"reply": ai_reply})

    except Exception as e:
        print("❌ Lỗi AI:", e)
        return jsonify({"reply": f"Lỗi khi gọi AI: {str(e)}"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
