import os
from fastapi import HTTPException, Request
from passlib.context import CryptContext
from jose import jwt

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_hashed_password(password: str) -> str:
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    return password_context.verify(password, hashed_pass)


def create_access_token(to_encode):
    return jwt.encode(to_encode, os.environ.get("JWT_SECRET_KEY"), "HS256")


def decode_access_token(token: str):
    jwt_token = token.split(" ")[1]
    payload = jwt.decode(
        jwt_token, os.environ.get("JWT_SECRET_KEY"), algorithms=['HS256'])
    return payload


def verify_token(request: Request):
    try:
        authorization = request.headers.get('authorization')

        user = decode_access_token(authorization)

        if authorization == "":
            raise HTTPException(status_code=401, detail="Unauthorized")

        if not user:
            raise HTTPException(status_code=401, detail="Unauthorized")

        if "id" in user and user['id'] == 411:
            raise HTTPException(status_code=401, detail="Unauthorized")

        return user
    except Exception as e:
        print(e)
        raise HTTPException(status_code=401, detail="Unauthorized")
