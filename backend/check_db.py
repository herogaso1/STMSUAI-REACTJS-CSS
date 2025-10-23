import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

# Load biến môi trường
load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL')

print("=" * 60)
print("🔍 KIỂM TRA KẾT NỐI DATABASE")
print("=" * 60)

print(f"\n📌 Database URL: {DATABASE_URL}")

try:
    # Tạo engine kết nối
    engine = create_engine(DATABASE_URL)
    
    # Test kết nối
    with engine.connect() as conn:
        result = conn.execute(text("SELECT version()"))
        version = result.fetchone()[0]
        
        print("\n✅ KẾT NỐI THÀNH CÔNG!")
        print(f"📌 PostgreSQL Version: {version[:50]}...")
        
        # Kiểm tra database name
        result = conn.execute(text("SELECT current_database()"))
        db_name = result.fetchone()[0]
        print(f"📌 Database hiện tại: {db_name}")
        
        # Đếm số bảng
        result = conn.execute(text("""
            SELECT COUNT(*) 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """))
        table_count = result.fetchone()[0]
        print(f"📌 Số lượng bảng: {table_count}")
        
        # Đếm users
        result = conn.execute(text("SELECT COUNT(*) FROM users"))
        users_count = result.fetchone()[0]
        print(f"📌 Số lượng users: {users_count}")
        
        print("\n" + "=" * 60)
        print("✅ DATABASE ĐANG HOẠT ĐỘNG BÌNH THƯỜNG!")
        print("=" * 60)

except Exception as e:
    print("\n❌ LỖI KẾT NỐI!")
    print(f"Chi tiết lỗi: {e}")
    print("=" * 60)