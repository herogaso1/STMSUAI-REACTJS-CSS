from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
from DB.database import get_db, engine
from DB.models import User, Task, Workspace, Tag, Note, Notification
from sqlalchemy import text
from werkzeug.security import generate_password_hash, check_password_hash

# --- 1. THÊM IMPORT CHO CLOUDINARY ---
import cloudinary
import cloudinary.uploader

app = Flask(__name__)
CORS(app)

# 🔹 Tải biến môi trường
load_dotenv()

# --- 2. CẤU HÌNH CLOUDINARY TỪ FILE .ENV ---
cloudinary.config(cloudinary_url=os.getenv("CLOUDINARY_URL"), secure=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MODEL_NAME = "gemini-2.5-flash"  # ✅ Đặt đúng tên biến

# --- 3. (ĐÃ KHÔI PHỤC) DỮ LIỆU HUẤN LUYỆN AI ---
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

# ✅ Route test database connection
@app.route('/api/db-test', methods=['GET'])
def db_test():
    try:
        db = next(get_db())
        db.execute(text("SELECT 1"))
        users_count = db.query(User).count()
        tasks_count = db.query(Task).count()
        return jsonify({
            "message": "✅ Kết nối database thành công!",
            "database": "my_project_STMSUAI_db",
            "users_count": users_count,
            "tasks_count": tasks_count
        })
    except Exception as e:
        return jsonify({"error": f"❌ Lỗi database: {str(e)}"}), 500

# ✅ Route lấy danh sách users
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        db = next(get_db())
        users = db.query(User).limit(10).all()
        users_list = [{
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "role": user.role,
            "created_at": user.created_at.isoformat() if user.created_at else None
        } for user in users]
        return jsonify({"users": users_list, "count": len(users_list)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Route đăng ký tài khoản
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not all([username, email, password]):
        return jsonify({"message": "Thiếu thông tin đăng ký!"}), 400

    db = next(get_db())
    existing_user = db.query(User).filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email đã tồn tại!"}), 400

    hashed_pw = generate_password_hash(password)
    new_user = User(username=username, email=email, password_hash=hashed_pw)
    db.add(new_user)
    db.commit()

    return jsonify({"message": "Đăng ký thành công!"}), 201

# ✅ Route đăng nhập tài khoản
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not all([email, password]):
        return jsonify({"message": "Thiếu email hoặc mật khẩu!"}), 400

    db = next(get_db())
    user = db.query(User).filter_by(email=email).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Sai email hoặc mật khẩu!"}), 401

    return jsonify({
        "message": "Cập nhật hồ sơ thành công!",
        "user": {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "avatar_url": user.avatar_url,
            "created_at": user.created_at.isoformat() if user.created_at else None # 👈 THÊM DÒNG NÀY
        }
    }), 200

# --- 4. (ĐÃ KHÔI PHỤC) ROUTE AI CHAT ---
@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "⚠️ Bạn chưa nhập tin nhắn nào!"})

    if not GEMINI_API_KEY:
        return jsonify({"reply": "⚠️ Thiếu GEMINI_API_KEY trong file .env"})

    try:
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

# ----------------------------------------------------
# ⬇️ (ĐÃ SỬA) CODE CẬP NHẬT PROFILE ⬇️
# ----------------------------------------------------
@app.route('/api/profile/update', methods=['POST'])
def update_profile():
    # DỮ LIỆU GIỜ NẰM TRONG `request.form` (vì là FormData)
    user_id = request.form.get('user_id')
    new_username = request.form.get('username')
    new_email = request.form.get('email')
    
    # FILE NẰM TRONG `request.files`
    avatar_file = request.files.get('avatar_file')

    if not all([user_id, new_username, new_email]):
        return jsonify({"message": "Thiếu thông tin user_id, username hoặc email!"}), 400

    db = next(get_db())
    
    # 1. Tìm user trong CSDL
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        return jsonify({"message": "Không tìm thấy người dùng!"}), 404

    # 2. Kiểm tra trùng lặp
    if new_username != user.username:
        existing_username = db.query(User).filter(User.username == new_username).first()
        if existing_username:
            return jsonify({"message": "Username này đã có người sử dụng!"}), 400
    
    if new_email != user.email:
        existing_email = db.query(User).filter(User.email == new_email).first()
        if existing_email:
            return jsonify({"message": "Email này đã có người sử dụng!"}), 400

    # 3. Cập nhật thông tin text
    user.username = new_username
    user.email = new_email
    
    # 5. XỬ LÝ TẢI FILE AVATAR MỚI
    if avatar_file:
        try:
            # Tải file lên Cloudinary
            upload_result = cloudinary.uploader.upload(
                avatar_file,
                # Cắt ảnh thành 150x150 và bo tròn
                crop="thumb", 
                gravity="face", 
                width=150, 
                height=150, 
                radius="max"
            )
            # Lấy URL an toàn
            new_avatar_url = upload_result.get('secure_url')
            if new_avatar_url:
                user.avatar_url = new_avatar_url
        except Exception as e:
            print(f"Lỗi tải ảnh lên Cloudinary: {e}")
            # Không làm sập server, chỉ bỏ qua việc cập nhật avatar
            pass 

    db.commit() # Lưu thay đổi
    db.refresh(user) # Làm mới dữ liệu từ CSDL

    # 4. Trả về thông tin user đã cập nhật
    return jsonify({
        "message": "Cập nhật hồ sơ thành công!",
        "user": {
            "user_id": user.user_id,
            "username": user.username,
            "email": user.email,
            "avatar_url": user.avatar_url # Trả về avatar_url mới
        }
    }), 200
# ----------------------------------------------------
# ----------------------------------------------------
# ----------------------------------------------------
# ----------------------------------------------------

from flask_mail import Mail, Message
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadTimeSignature
import time # Import thêm

# --- CẤU HÌNH FLASK-MAIL ---
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_USERNAME')

mail = Mail(app)

# Tạo serializer để tạo token bảo mật
# 'SECRET_KEY' nên là một chuỗi bí mật ngẫu nhiên, bạn có thể thêm vào .env
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'mot-chuoi-bi-mat-rat-kho-doan-abc123')
s = URLSafeTimedSerializer(app.config['SECRET_KEY'])


# ✅ API 1: Gửi link quên mật khẩu
@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"message": "Vui lòng nhập email!"}), 400

    db = next(get_db())
    user = db.query(User).filter_by(email=email).first()

    if not user:
        # Lỗi bảo mật: Không nên nói "Không tìm thấy user"
        # Chỉ cần trả về thành công giả để tránh lộ thông tin
        print(f"Yêu cầu reset mật khẩu cho email không tồn tại: {email}")
        return jsonify({"message": "Nếu email tồn tại, link reset sẽ được gửi."}), 200

    # Tạo token hết hạn sau 1 giờ (3600 giây)
    token = s.dumps(email, salt='password-reset-salt')

    # Link này trỏ về trang frontend ResetPassword.jsx của bạn
    # PORT 5173 là port mặc định của Vite (frontend)
    reset_link = f"http://localhost:5173/reset-password/{token}"

    # Gửi email
    try:
        msg = Message(
            subject="[STMSUAI] Yêu cầu đặt lại mật khẩu",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[email]
        )
        msg.html = f"""
        <p>Chào bạn {user.username},</p>
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p>Vui lòng nhấp vào link dưới đây để đặt lại mật khẩu. Link này sẽ hết hạn sau 1 giờ.</p>
        <a href="{reset_link}" 
           style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;">
           Đặt lại mật khẩu
        </a>
        <p>Nếu bạn không yêu cầu, vui lòng bỏ qua email này.</p>
        <p>Trân trọng,<br>Đội ngũ STMSUAI - Admin Minh</p>
        """
        mail.send(msg)
        return jsonify({"message": "Đã gửi link đặt lại mật khẩu qua email."}), 200
    except Exception as e:
        print(f"Lỗi gửi mail: {e}")
        return jsonify({"message": f"Lỗi máy chủ khi gửi mail: {e}"}), 500


# ✅ API 2: Xử lý reset mật khẩu
@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('password')

    if not token or not new_password:
        return jsonify({"message": "Thiếu token hoặc mật khẩu mới!"}), 400

    try:
        # Giải mã token, đặt thời gian hết hạn là 3600 giây (1 giờ)
        email = s.loads(token, salt='password-reset-salt', max_age=3600)
    except SignatureExpired:
        return jsonify({"message": "Link đã hết hạn! Vui lòng yêu cầu lại."}), 400
    except BadTimeSignature:
        return jsonify({"message": "Link không hợp lệ!"}), 400
    except Exception:
        return jsonify({"message": "Link không hợp lệ!"}), 400

    db = next(get_db())
    user = db.query(User).filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Người dùng không tồn tại!"}), 404

    # Cập nhật mật khẩu
    hashed_pw = generate_password_hash(new_password)
    user.password_hash = hashed_pw
    db.commit()

    return jsonify({"message": "Đã cập nhật mật khẩu thành công!"}), 200

# ----------------------------------------------------
# ----------------------------------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)