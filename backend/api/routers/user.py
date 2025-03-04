from typing import Union, Optional
from schemas import user as user_schema

from db import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models.user import User as user_model

user_router = APIRouter()
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(db: AsyncSession, email: str):
    result = await db.execute(
        select(user_model).filter(user_model.email == email)
    )
    return result.scalar_one_or_none()

@user_router.post("/user/register", response_model=user_schema.UserCreateResponse)
# validate user
async def register(user_body: user_schema.UserCreate, db: AsyncSession = Depends(get_db)):
    
    existing_user = await get_user(db, user_body.email)
    if existing_user:
        raise HTTPException(
            status_code=400, 
            detail="User already exists"
        )
        
    hashed_password = get_password_hash(user_body.password)
    
    db_user = user_model(
        name=user_body.name,
        email=user_body.email,
        password=hashed_password
    )
    
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user