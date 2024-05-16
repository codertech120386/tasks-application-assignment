from database import engine
from auth import User
from tasks import Task


def create_db_tables_from_models():
    User.metadata.create_all(bind=engine)
    Task.metadata.create_all(bind=engine)
