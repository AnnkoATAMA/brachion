from db import get_db
from fastapi import Depends
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from schemas import room as room_schema
from models import room as room_model
from models import player as player_model
from cruds.user import get_current_user_from_cookie


# /room POST
async def create_room(
    form_data: room_schema.RoomCreate, 
    db: AsyncSession, 
    current_user: dict = Depends(get_current_user_from_cookie)
    ):
    room_data = room_model.Room(
        max_players=form_data.max_players,
        game_type=form_data.game_type
    )
    
    db.add(room_data)
    await db.commit()
    await db.refresh(room_data)
    
    room_id = room_data.id
    user_id = current_user["id"]
    
    player_data = player_model.Player(
        room_id=room_id,
        user_id=user_id,
        status="waiting"
    )
    
    db.add(player_data)
    await db.commit()
    
    return {
        "id": room_id,
        "max_players": form_data.max_players,
        "game_type": form_data.game_type
    }
    
# /room GET
async def get_rooms(db: AsyncSession):
    result = await db.execute(
        select(room_model.Room)
    )   
    rooms = result.scalars().all()
    
    return rooms