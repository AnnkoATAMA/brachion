import os
from dotenv import load_dotenv
from os.path import join, dirname

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


class Env:
    DATABASE = os.environ.get("DATABASE")
    DB_USER = os.environ.get("DB_USER")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_HOST = os.environ.get("DB_HOST")
    DB_PORT = os.environ.get("DB_PORT")
    DB_NAME = os.environ.get("DB_NAME")

    SECRET_KEY = os.environ.get("SECRET_KEY", "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7")
    ALGORITHM = os.environ.get("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
