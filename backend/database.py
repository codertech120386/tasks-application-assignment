import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

username = os.environ.get("DB_USERNAME"),
password = os.environ.get("DB_PASSWORD"),
host = os.environ.get("DB_HOST"),
db = os.environ.get("DB_NAME")

SQLALCHEMY_DATABASE_URL = f"postgresql+psycopg2://{username[0]}:{password[0]}@{host[0]}/{db}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
