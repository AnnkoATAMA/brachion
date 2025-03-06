from db import get_db
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import room as room_schema
from cruds.user import get_current_user_from_cookie
from cruds import room as room_crud


room_router = APIRouter()

@room_router.post("/room", response_model=room_schema.Room)
async def create_room(
    form_data: room_schema.RoomCreate, 
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user_from_cookie)
    ):
    
    return await room_crud.create_room(form_data, db, current_user)

@room_router.get("/room", response_model=list[room_schema.Room])
async def get_rooms(db: AsyncSession = Depends(get_db)):
    return await room_crud.get_rooms(db)
    
    
    
    
    