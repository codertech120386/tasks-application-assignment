from datetime import datetime
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class Task(Base):
    __tablename__ = 'tasks'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100))
    description = Column(String(500))
    # I don't think creating enum fields is a good idea
    # as when we add or remove something it leads to alter table and table locks
    # and I manage by validation in the backend itself
    status = Column(String(20), default="To Do")  # comment
    creator_id = Column(Integer, ForeignKey('users.id', onupdate="SET NULL", ondelete="SET NULL"))
    created = Column(DateTime, default=datetime.utcnow)
    updated = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    creator = relationship(
        "User", backref="users", foreign_keys=[creator_id])
