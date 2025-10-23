from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

# Load biến môi trường từ file .env
load_dotenv()

# Lấy URL kết nối từ .env
DATABASE_URL = os.getenv("DATABASE_URL")

# Khởi tạo engine và session
# Thêm sslmode để Neon chấp nhận kết nối
engine = create_engine(DATABASE_URL, echo=True, connect_args={
    "sslmode": "require",
    "connect_timeout": 10  # Thêm dòng này: Bắt buộc chờ tối đa 10 giây
})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Hàm tiện ích để dùng trong Flask routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Kiểm tra kết nối database khi chạy trực tiếp file
if __name__ == "__main__":
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connected successfully:", result.fetchone())
    except Exception as e:
        print("❌ Database connection error:", e)
