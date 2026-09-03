# Duo Data

Marketing site and live metrics explorer.

**One business meaning. Two ways to work with it.**

## What you need

| Tool | Version |
|------|---------|
| Node.js | 18+ (20 or 22 is fine) |
| Yarn | 1.22 (`corepack enable` then `corepack prepare yarn@1.22.22 --activate`) |
| Python | 3.11 or 3.12 (only if you want Explore + demo form) |
| Docker | Optional, for MongoDB |

The **landing page, case studies, and Business/Technical switch** run with the frontend alone.

**Explore** (`/explore`) and **Book a demo** need the FastAPI backend and MongoDB.

---

## 1. Website only (fastest)

```bash
git clone https://github.com/Akyogiweb/Duodata.git
cd Duodata
git checkout Duodata/SIT/duo-story-website-redo-780c   # or SIT / main if this is merged

cd frontend
cp env.example .env
yarn install
yarn start
```

Open [http://localhost:3000](http://localhost:3000).

`env.example` sets:

```
REACT_APP_BACKEND_URL=http://localhost:8000
```

If the API is not running, marketing pages still work. Demo submit and `/explore` will fail until step 2.

---

## 2. Full stack (Explore + demo requests)

### MongoDB

With Docker:

```bash
# from the repo root
docker compose up -d
```

Without Docker, install MongoDB locally and keep it on port `27017`.

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp env.example .env
uvicorn server:app --reload --host 0.0.0.0 --port 8000
```

Check: [http://localhost:8000/api/](http://localhost:8000/api/) should return `{"message":"Hello World"}`.

### Frontend

In a second terminal, follow **Website only** above (`yarn start` on port 3000).

---

## Commands

| Goal | Command |
|------|---------|
| Start website | `cd frontend && yarn start` |
| Production frontend build | `cd frontend && yarn build` |
| Start API | `cd backend && .venv/bin/uvicorn server:app --reload --port 8000` |
| Start Mongo | `docker compose up -d` |
| Stop Mongo | `docker compose down` |

---

## Troubleshooting

**`yarn: command not found`**  
Use `npm install -g yarn` or Corepack, then `yarn install` inside `frontend/`.

**`emergentintegrations` used to fail `pip install`**  
That unused package was removed from `requirements.txt`. If your clone still lists it, delete that line and install again.

**`KeyError: MONGO_URL`**  
Copy `backend/env.example` to `backend/.env` before starting uvicorn.

**Demo form or Explore errors**  
Confirm Mongo is running, backend is on `:8000`, and `frontend/.env` has `REACT_APP_BACKEND_URL=http://localhost:8000`. Restart `yarn start` after changing `.env`.

**Port 3000 in use**  
`PORT=3001 yarn start` from `frontend/`.
