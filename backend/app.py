from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

openai.api_key = "YOUR_OPENAI_API_KEY"  # 🔑 Thay bằng key thật của bạn

@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    message = data.get("message", "")

    if not message.strip():
        return jsonify({"reply": "Vui lòng nhập nội dung."})

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Bạn là trợ lý AI giúp người dùng quản lý công việc."},
                {"role": "user", "content": message}
            ]
        )
        reply = completion.choices[0].message["content"].strip()
        return jsonify({"reply": reply})
    except Exception as e:
        print(e)
        return jsonify({"reply": "⚠️ Lỗi khi kết nối AI."})

if __name__ == '__main__':
    app.run(port=5000)
