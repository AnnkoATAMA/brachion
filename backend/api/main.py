import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health():
    return "working!"

prefix = "/api"
# app.include_router(user.router, prefix=prefix)
# # router足すときはここに追記してね

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", reload=True)