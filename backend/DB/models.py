from sqlalchemy import Column, Integer, BigInteger, String, Text, Boolean, DateTime, ForeignKey, TIMESTAMP, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from DB.database import Base

class User(Base):
    __tablename__ = 'users'
    
    user_id = Column(BigInteger, primary_key=True, autoincrement=True)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255))
    username = Column(String(100), unique=True, nullable=False)
    full_name = Column(String(255))
    avatar_url = Column(Text)
    auth_provider = Column(String(50), nullable=False, default='email')
    auth_provider_id = Column(String(255))
    role = Column(String(50), nullable=False, default='user')
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    
    # Relationships
    settings = relationship('UserSetting', back_populates='user', uselist=False, cascade='all, delete-orphan')
    tags = relationship('Tag', back_populates='user', cascade='all, delete-orphan')
    workspaces = relationship('Workspace', back_populates='owner')
    tasks = relationship('Task', back_populates='creator')
    notes = relationship('Note', back_populates='creator')
    notifications = relationship('Notification', back_populates='user', cascade='all, delete-orphan')
    pomodoro_sessions = relationship('PomodoroSession', back_populates='user', cascade='all, delete-orphan')

class UserSetting(Base):
    __tablename__ = 'usersettings'
    
    user_id = Column(BigInteger, ForeignKey('users.user_id', ondelete='CASCADE'), primary_key=True)
    notification_prefs = Column(JSON)
    audio_prefs = Column(JSON)
    
    user = relationship('User', back_populates='settings')

class Tag(Base):
    __tablename__ = 'tags'
    
    tag_id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    name = Column(String(100), nullable=False)
    color_hex = Column(String(7))
    
    user = relationship('User', back_populates='tags')

class Workspace(Base):
    __tablename__ = 'workspaces'
    
    workspace_id = Column(BigInteger, primary_key=True, autoincrement=True)
    owner_id = Column(BigInteger, ForeignKey('users.user_id'), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    
    owner = relationship('User', back_populates='workspaces')
    tasks = relationship('Task', back_populates='workspace')
    notes = relationship('Note', back_populates='workspace')

class Task(Base):
    __tablename__ = 'tasks'
    
    task_id = Column(BigInteger, primary_key=True, autoincrement=True)
    creator_id = Column(BigInteger, ForeignKey('users.user_id'), nullable=False)
    workspace_id = Column(BigInteger, ForeignKey('workspaces.workspace_id', ondelete='CASCADE'))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    deadline = Column(TIMESTAMP(timezone=True))
    priority = Column(String(50), default='medium')
    status = Column(String(50), nullable=False, default='todo')
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    
    creator = relationship('User', back_populates='tasks')
    workspace = relationship('Workspace', back_populates='tasks')

class Note(Base):
    __tablename__ = 'notes'
    
    note_id = Column(BigInteger, primary_key=True, autoincrement=True)
    creator_id = Column(BigInteger, ForeignKey('users.user_id'), nullable=False)
    workspace_id = Column(BigInteger, ForeignKey('workspaces.workspace_id', ondelete='CASCADE'))
    title = Column(String(255))
    content = Column(JSON)
    type = Column(String(50), nullable=False, default='note')
    reminder_at = Column(TIMESTAMP(timezone=True))
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())
    
    creator = relationship('User', back_populates='notes')
    workspace = relationship('Workspace', back_populates='notes')

class Notification(Base):
    __tablename__ = 'notifications'
    
    notification_id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    type = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    reference_id = Column(BigInteger)
    is_read = Column(Boolean, nullable=False, default=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=func.now())
    
    user = relationship('User', back_populates='notifications')

class PomodoroSession(Base):
    __tablename__ = 'pomodorosessions'
    
    session_id = Column(BigInteger, primary_key=True, autoincrement=True)
    user_id = Column(BigInteger, ForeignKey('users.user_id', ondelete='CASCADE'), nullable=False)
    start_time = Column(TIMESTAMP(timezone=True), nullable=False)
    end_time = Column(TIMESTAMP(timezone=True), nullable=False)
    duration_minutes = Column(Integer, nullable=False)
    type = Column(String(50), nullable=False)
    task_id = Column(BigInteger, ForeignKey('tasks.task_id', ondelete='SET NULL'))
    
    user = relationship('User', back_populates='pomodoro_sessions')
if __name__ == "__main__":
    from DB.database import engine
    print("🔧 Creating tables in the Neon database...")
    Base.metadata.create_all(bind=engine)
    print("✅ All tables created successfully!")
