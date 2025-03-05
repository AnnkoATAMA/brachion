from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status, Response
from datetime import datetime, timedelta, timezone
from typing import Union
import jwt

import models.user as user_model
import schemas.user as user_schema
from passlib.context import CryptContext
from env import Env


SECRET_KEY = Env.SECRET_KEY
ALGORITHM = Env.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = Env.ACCESS_TOKEN_EXPIRE_MINUTES


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

async def get_user_by_email(db: AsyncSession, email: str):
    result = await db.execute(
        select(user_model.User).filter(user_model.User.email == email)
    )
    return result.scalar_one_or_none()

async def get_user_by_name(db: AsyncSession, name: str):
    result = await db.execute(
        select(user_model.User).filter(user_model.User.name == name)
    )
    return result.scalar_one_or_none()

async def authenticate_user(db: AsyncSession, email: str, password: str):
    user = await get_user_by_email(db, email)
    if not user:
        return None
    if not verify_password(password, user.password):
        return None
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# /user/register
async def register(user_body: user_schema.UserCreate, db: AsyncSession):
    
    existing_name = await get_user_by_name(db, user_body.name)
    
    if existing_name:
        raise HTTPException(
            status_code=400, 
            detail="Name already exists"
        )
    
    existing_email = await get_user_by_email(db, user_body.email)
    
    if existing_email:
        raise HTTPException(
            status_code=400, 
            detail="Email already exists"
        )
        
    hashed_password = get_password_hash(user_body.password)
    
    db_user = user_model.User(
        name=user_body.name,
        email=user_body.email,
        password=hashed_password
    )
    
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


# /user/login
async def login_user(db: AsyncSession, email: str, password: str, response: Response = None):
    
    user = await authenticate_user(db, email, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
   
    access_token = create_access_token(
        data={
            "sub": user.email,
            "name": user.name,
            },
        expires_delta=access_token_expires
    )
    
    
    if response:
        response.set_cookie(
            key="access_token",
            value=f"Bearer {access_token}",
            httponly=True,
            secure=False,  # HTTPS環境ではTrueにする
            samesite="lax",
            expires=datetime.now().timestamp() + access_token_expires.total_seconds(),
            max_age=int(access_token_expires.total_seconds())
        )
    
   
    return {"access_token": access_token, "token_type": "bearer"}