from schemas import user as user_schema
from db import get_db
from fastapi import APIRouter, Depends, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
import cruds.user as user_crud
from pydantic import BaseModel



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class Token(BaseModel):
    access_token: str
    token_type: str

user_router = APIRouter()


@user_router.post("/user/register", response_model=user_schema.UserCreateResponse)
async def register(user_body: user_schema.UserCreate, db: AsyncSession = Depends(get_db)):
        
    return await user_crud.register(db, user_body)

@user_router.post("/token", response_model=Token)
async def login_for_access_token(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):
    token_data = await user_crud.login_user(
        db=db,
        username=form_data.username,
        password=form_data.password,
        response=response
    )
    
    return Token(**token_data)