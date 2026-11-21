## 5. Running the Prototype

### 5.1 Prerequisites

- **Docker** (for the backend + DB)
- **Node.js v20+** (for the frontend)

If you don't want to use Docker, just run `pip install -r backend/requirements.txt` and `npm ci` inside each folder.

### 5.2 Docker Compose (one-click)

```bash
docker compose up --build
```

### 5.3 Manual (no Docker)
# start DB locally (PostgreSQL)
psql -U postgres -h localhost

# create database
createdb deskworks

# backend
cd backend
pip install -r requirements.txt
alembic upgrade head   # run migrations
uvicorn app.main:app --reload

# frontend
cd ../frontend
npm ci
npm run dev

Open http://localhost:5173 — you should see a 3D office. Click the cube → Workstation UI.

cd tests/cypress
npm ci
npx cypress open   # or `npx cypress run`

