from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# =========================
# Demo Request Endpoints
# =========================
class DemoRequestCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    role: Optional[str] = None
    company_size: Optional[str] = None
    use_case: Optional[str] = None
    message: Optional[str] = None


class DemoRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: str
    role: Optional[str] = None
    company_size: Optional[str] = None
    use_case: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


@api_router.post("/demo-requests", response_model=DemoRequest)
async def create_demo_request(payload: DemoRequestCreate):
    obj = DemoRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.demo_requests.insert_one(doc)
    logger.info(f"New demo request from {obj.email} ({obj.company})")
    return obj


@api_router.get("/demo-requests", response_model=List[DemoRequest])
async def list_demo_requests():
    items = await db.demo_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for it in items:
        if isinstance(it.get('created_at'), str):
            it['created_at'] = datetime.fromisoformat(it['created_at'])
    return items


# =========================
# Slices (Metrics Ontology) Endpoints
# =========================
DEFAULT_SLICES = [
    {"name": "Deal Stage", "status": "Implemented", "tag": None, "owner": "Bryan Mull", "source": "Snowflake"},
    {"name": "Debt Tranche", "status": "Approved", "tag": "Covenant Compliance", "owner": "Sander V.", "source": "dbt"},
    {"name": "ESG Category", "status": "Proposed", "tag": "SFDR / EDCI", "owner": "Floris J.", "source": "Databricks"},
    {"name": "Exit Route", "status": "Proposed", "tag": None, "owner": "Arlinda M.", "source": "Snowflake"},
    {"name": "Fund", "status": "Implemented", "tag": "ILPA Reporting", "owner": "Jeffrey H.", "source": "dbt"},
    {"name": "Geographic Region", "status": "Approved", "tag": None, "owner": "Stephanie P.", "source": "BigQuery"},
    {"name": "Holding Period Band", "status": "Approved", "tag": None, "owner": "Jason R.", "source": "Snowflake"},
    {"name": "Investment Status", "status": "Implemented", "tag": None, "owner": "Bryan Mull", "source": "Snowflake"},
    {"name": "Investor Type", "status": "Implemented", "tag": "SEC Form PF", "owner": "Sander V.", "source": "Databricks"},
    {"name": "Portfolio Company", "status": "Implemented", "tag": None, "owner": "Floris J.", "source": "dbt"},
    {"name": "Revenue Type", "status": "Approved", "tag": None, "owner": "Arlinda M.", "source": "dbt"},
    {"name": "Sector", "status": "Implemented", "tag": None, "owner": "Jeffrey H.", "source": "Snowflake"},
    {"name": "Sourcing Channel", "status": "Implemented", "tag": None, "owner": "Stephanie P.", "source": "BigQuery"},
    {"name": "Valuation Method", "status": "Approved", "tag": "ASC 820 / IPEV", "owner": "Jason R.", "source": "dbt"},
    {"name": "Value Creation Lever", "status": "Proposed", "tag": None, "owner": "Bryan Mull", "source": "Databricks"},
    {"name": "Vintage Year", "status": "Implemented", "tag": None, "owner": "Sander V.", "source": "Snowflake"},
]

ALLOWED_STATUSES = {"Implemented", "Approved", "Proposed"}


class SliceModel(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    status: str = "Proposed"
    tag: Optional[str] = None
    owner: Optional[str] = None
    source: Optional[str] = None
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SliceCreate(BaseModel):
    name: str
    status: Optional[str] = "Proposed"
    tag: Optional[str] = None
    owner: Optional[str] = None
    source: Optional[str] = None


class SliceUpdate(BaseModel):
    status: Optional[str] = None
    tag: Optional[str] = None
    owner: Optional[str] = None
    source: Optional[str] = None


async def _seed_slices_if_empty():
    count = await db.slices.count_documents({})
    if count == 0:
        for s in DEFAULT_SLICES:
            obj = SliceModel(**s)
            doc = obj.model_dump()
            doc['updated_at'] = doc['updated_at'].isoformat()
            await db.slices.insert_one(doc)


@api_router.get("/slices", response_model=List[SliceModel])
async def list_slices():
    await _seed_slices_if_empty()
    items = await db.slices.find({}, {"_id": 0}).to_list(1000)
    for it in items:
        if isinstance(it.get('updated_at'), str):
            it['updated_at'] = datetime.fromisoformat(it['updated_at'])
    # Sort alphabetically by name for stable UX
    items.sort(key=lambda x: x['name'])
    return items


@api_router.post("/slices", response_model=SliceModel)
async def create_slice(payload: SliceCreate):
    status = payload.status or "Proposed"
    if status not in ALLOWED_STATUSES:
        status = "Proposed"
    obj = SliceModel(
        name=payload.name.strip(),
        status=status,
        tag=payload.tag,
        owner=payload.owner,
        source=payload.source,
    )
    doc = obj.model_dump()
    doc['updated_at'] = doc['updated_at'].isoformat()
    await db.slices.insert_one(doc)
    return obj


@api_router.patch("/slices/{slice_id}", response_model=SliceModel)
async def update_slice(slice_id: str, payload: SliceUpdate):
    updates = {k: v for k, v in payload.model_dump().items() if v is not None}
    if 'status' in updates and updates['status'] not in ALLOWED_STATUSES:
        updates.pop('status')
    updates['updated_at'] = datetime.now(timezone.utc).isoformat()
    await db.slices.update_one({"id": slice_id}, {"$set": updates})
    item = await db.slices.find_one({"id": slice_id}, {"_id": 0})
    if item and isinstance(item.get('updated_at'), str):
        item['updated_at'] = datetime.fromisoformat(item['updated_at'])
    return item


@api_router.delete("/slices/{slice_id}")
async def delete_slice(slice_id: str):
    await db.slices.delete_one({"id": slice_id})
    return {"ok": True}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()