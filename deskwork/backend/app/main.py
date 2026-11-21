from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from .api import missions_router, user_router
from .deps import get_db, get_user_id
from .db import engine, SessionLocal

app = FastAPI(title="Deskworks Prototype")

# Allow dev front‑end (localhost:3000) to talk to us
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB init – runs Alembic migrations on startup
@app.on_event("startup")
def _init_db():
    import os, subprocess
    # run alembic upgrade head (you can also use `alembic upgrade head` manually)
    if not os.path.exists("./alembic/versions"):
        raise RuntimeError("No Alembic env found. Did you copy the folder?")
    subprocess.run(["alembic", "upgrade", "head"], check=True)

app.include_router(user_router, prefix="/api/user")
app.include_router(missions_router, prefix="/api/missions")

# simple health endpoint
@app.get("/health")
def health():
    return {"status": "ok"}
