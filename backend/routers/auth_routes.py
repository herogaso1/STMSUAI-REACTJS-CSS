from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from DB.database import get_db
from DB.models import User
from sqlalchemy.orm import Session

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    if not email or not username or not password:
        return jsonify({"message": "Thiếu thông tin đăng ký"}), 400

    db: Session = next(get_db())

    if db.query(User).filter((User.email == email) | (User.username == username)).first():
        return jsonify({"message": "Email hoặc Username đã tồn tại"}), 400

    hashed_pw = generate_password_hash(password)
    new_user = User(email=email, username=username, password_hash=hashed_pw)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return jsonify({"message": "Đăng ký thành công!", "user_id": new_user.user_id}), 201
