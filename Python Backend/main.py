from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import shutil
from pathlib import Path
import json
from models.retriever import search_items
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from models.sentiments import analyze_sentiment
from models.image_search import search_similar_items_by_image
import numpy as np
from PIL import Image
from models.image_search import model
from pydantic import BaseModel
from models.suggest_cost import suggest_cost

app = FastAPI()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

DB_FILE = Path("uploads/clothes_db.json")

# Load ML models
# type_model = load_model("models/type_model.h5")
# condition_model = load_model("models/condition_model.h5")

TYPE_LABELS = ['casual', 'party_wear', 'ethnic']
CONDITION_LABELS = ['good', 'average', 'poor']

def preprocess_image(file_path):
    img = Image.open(file_path).convert("RGB")
    img = img.resize((128, 128))
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.get("/")
def read_root():
    return {"message": "Welcome to Rewear API"}

@app.post("/upload-item/")
async def upload_item(
    file: UploadFile = File(...),
    title: str = Form(...),
    description: str = Form(...)
):
    if file.content_type not in ["image/jpeg", "image/png"]:
        return JSONResponse(status_code=400, content={"error": "Only JPEG and PNG files allowed."})

    # Save image
    file_location = UPLOAD_DIR / file.filename
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Load existing items
    if DB_FILE.exists():
        with open(DB_FILE, "r") as f:
            clothes = json.load(f)
    else:
        clothes = []

    # Generate new ID
    new_id = (max([item["id"] for item in clothes]) + 1) if clothes else 1

    img = Image.open(file_location)
    embedding = model.encode(img).tolist()
    
    # Create new item
    new_item = {
        "id": new_id,
        "title": title,
        "description": description,
        "image": file.filename,
        "image_embedding": embedding
    }

    # Append and save
    clothes.append(new_item)
    with open(DB_FILE, "w") as f:
        json.dump(clothes, f, indent=2)

    return {
        "message": "Item uploaded and saved successfully",
        "item": new_item
    }

@app.get("/items")
def get_all_items():
    if DB_FILE.exists():
        with open(DB_FILE, "r") as f:
            clothes = json.load(f)
    else:
        clothes = []
    return {"items": clothes}



@app.get("/search")
def search(query: str):
    results = search_items(query)
    return {"results": results}


@app.post("/add-feedback/")
async def add_feedback(item_id: int, feedback: str):
    # Load DB
    if DB_FILE.exists() and DB_FILE.stat().st_size != 0:
        with open(DB_FILE, "r") as f:
            clothes = json.load(f)
    else:
        return JSONResponse(status_code=404, content={"error": "DB not found"})

    # Find item
    for item in clothes:
        if item["id"] == item_id:
            sentiment = analyze_sentiment(feedback)
            # Add feedbacks list if doesn't exist
            if "feedbacks" not in item:
                item["feedbacks"] = []
            item["feedbacks"].append({"text": feedback, "sentiment": sentiment})
            break
    else:
        return JSONResponse(status_code=404, content={"error": "Item not found"})

    # Save back
    with open(DB_FILE, "w") as f:
        json.dump(clothes, f, indent=2)

    return {"message": "Feedback added", "sentiment": sentiment}


@app.post("/search-by-image/")
async def search_by_image(file: UploadFile = File(...), top_k: int = 3):
    # Save temp file
    query_path = UPLOAD_DIR / f"query_{file.filename}"
    with open(query_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Call helper function
    results = search_similar_items_by_image(query_path, top_k=top_k)
    return results

class ItemInfo(BaseModel):
    brand: str
    title: str
    description: str
    date_of_purchase: str
    rent_duration_days: int  # Add this field

@app.post("/suggest-cost/")
async def suggest_cost_endpoint(item: ItemInfo):
    result = suggest_cost(
        brand=item.brand,
        title=item.title,
        description=item.description,
        date_of_purchase=item.date_of_purchase,
        rent_duration_days=item.rent_duration_days
    )
    return {
        "suggested_resale_price_usd": result["resale_price_usd"],
        "suggested_rental_price_usd": result["rental_price_usd"]
    }
