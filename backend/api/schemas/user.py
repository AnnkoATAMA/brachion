from pydantic import BaseModel, Field, ConfigDict

# basic infomation of user
class UserBase(BaseModel):
    name: str = Field(..., title="ユーザ名")
    email: str = Field(..., title="メールアドレス")

# user create
class UserCreate(UserBase):
    password: str = Field(..., title="パスワード")

# return user infomation
class UserCreateResponse(UserBase):
    id: int
    
    model_config = ConfigDict(from_attributes=True)