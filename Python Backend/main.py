from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import shutil
from pathlib import Path
import json
from models.retriever import search_items
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

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

    # Create new item
    new_item = {
        "id": new_id,
        "title": title,
        "description": description,
        "image": file.filename
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

# @app.post("/predict")
# async def predict(file: UploadFile = File(...)):
#     # Save uploaded image temporarily
#     file_location = UPLOAD_DIR / file.filename
#     with open(file_location, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     # Preprocess
#     img_data = preprocess_image(file_location)

#     # Predict type
#     type_pred = type_model.predict(img_data)
#     type_result = TYPE_LABELS[np.argmax(type_pred)]

#     # Predict condition
#     condition_pred = condition_model.predict(img_data)
#     condition_result = CONDITION_LABELS[np.argmax(condition_pred)]

#     return {
#         "message": "Prediction successful",
#         "type": type_result,
#         "condition": condition_result
#     }