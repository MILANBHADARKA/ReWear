# rewear/ml/precompute_embeddings.py
from sentence_transformers import SentenceTransformer
from PIL import Image
import json

DB_FILE = "uploads/clothes_db.json"
model = SentenceTransformer('clip-ViT-B-32')

with open(DB_FILE, "r") as f:
    clothes = json.load(f)

for item in clothes:
    if "image_embedding" not in item:
        img = Image.open(item["image"])
        item["image_embedding"] = model.encode(img).tolist()

with open(DB_FILE, "w") as f:
    json.dump(clothes, f, indent=2)

print(" Embeddings added to all items!")
