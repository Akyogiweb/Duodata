# Environment & Bootstrap

**Machine:** Linux 6.12.94+, x86_64  
**Discovered:** 2026-09-03 on Cursor Cloud Agent pod

## Available

| Tool | Version |
|------|---------|
| Node | v22.14.0 |
| npm | 10.9.7 |
| Python | 3.12.3 |
| Git | on `SIT` branch, origin `github.com/Akyogiweb/Duodata` |
| Yarn | 1.22.22 (packageManager in package.json) |

## Missing / broken for full local stack

| Dependency | Status | Impact |
|------------|--------|--------|
| MongoDB | NOT INSTALLED | Backend cannot start (`MONGO_URL` required) |
| `emergentintegrations==0.2.0` | NOT ON PyPI | `pip install -r requirements.txt` fails; **not imported in server.py** |
| `.env` files | NOT IN REPO | Frontend needs `REACT_APP_BACKEND_URL`; backend needs `MONGO_URL`, `DB_NAME` |
| Docker | NOT AVAILABLE | Cannot containerize Mongo easily |

## Verified commands

```bash
# Frontend (CONFIRMED working)
cd frontend
yarn install
REACT_APP_BACKEND_URL=http://localhost:8000 yarn build   # ✅ success

# Backend (BLOCKED without Mongo + env)
cd backend
# Requires: MONGO_URL, DB_NAME, optional CORS_ORIGINS
uvicorn server:app --host 0.0.0.0 --port 8000
```

## Required environment variables

### Backend (`backend/.env`)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=duodata
CORS_ORIGINS=http://localhost:3000
```

### Frontend (`frontend/.env`)
```
REACT_APP_BACKEND_URL=http://localhost:8000
```

## Emergent platform

- Base image: `fastapi_react_mongo_shadcn_base_image_cloud_arm:release-18082026-1`
- Remote preview (historical): `https://duodata-metrics.preview.emergentagent.com`
- Preview API returned **404** during this discovery session — may be deprovisioned

## Bootstrap gaps to close

1. Add `docker-compose.yml` or document Mongo install for local dev
2. Remove or make optional `emergentintegrations` in requirements.txt
3. Add `.env.example` files
4. Replace placeholder `index.html` title/description with Duodata SEO metadata
