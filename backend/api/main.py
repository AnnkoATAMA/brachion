import uvicorn
import yaml
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user
from routers import room

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("mahjong.yaml", "r", encoding="utf-8") as file:
    openapi_schema = yaml.safe_load(file)

def custom_openapi():
    return openapi_schema

app.openapi = custom_openapi

@app.get("/")
def health():
    return "working!"

# router足すときはここに追記してね
prefix = "/api"
app.include_router(user.user_router, prefix=prefix)
app.include_router(room.room_router)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True)