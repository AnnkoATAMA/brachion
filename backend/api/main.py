import uvicorn
from fastapi import FastAPI
from routers import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FastAPI",
    description="SampleAPI",
    middleware=[Middleware(SessionMiddleware, secret_key=Env.SECRET_KEY)],
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost",
    "http://127.0.0.1",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return "working!"

prefix = "/api"
app.include_router(user.router, prefix=prefix)
# router足すときはここに追記してね

if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", reload=True)