5. Running the Prototype

5.1 Prerequisites
Docker (for the backend + DB)
Node.js v20+ (for the frontend)
If you don’t want to use Docker, just run pip install -r backend/requirements.txt and npm ci inside each folder.

5.2 Docker Compose (one‑click)
bash
docker compose up --build
PostgreSQL will be exposed on localhost:5432.
FastAPI will start on http://localhost:8000.
The React dev server runs on http://localhost:5173 and proxies /api/* to the backend.
Why Docker?

It guarantees a clean, repeatable environment. You can also run it in CI for automated tests.

5.3 Manual (no Docker)
bash
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
Open http://localhost:5173 – you should see a 3D office. Click the cube → Workstation UI.

6. Quick Smoke‑Test (Cypress)
The repo includes a minimal Cypress test under tests/cypress/integration/mission_spec.cy.ts. Run:

bash
cd tests/cypress
npm ci
npx cypress open   # or `npx cypress run`
This will:

Open the page.
Click the PC cube.
Switch to SQL tab and run a simple query.
Verify that results appear.
Tip: Add more tests as you iterate on gameplay.
