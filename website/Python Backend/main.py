from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import shutil
import os
from pathlib import Path

app = FastAPI()

# Folder to store uploaded images
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Welcome to Rewear API"}

@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    # Validate image type
    if file.content_type not in ["image/jpeg", "image/png"]:
        return JSONResponse(status_code=400, content={"error": "Only JPEG and PNG files allowed."})

    file_location = UPLOAD_DIR / file.filename
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Image uploaded successfully",
        "filename": file.filename,
        "path": str(file_location)
    }
