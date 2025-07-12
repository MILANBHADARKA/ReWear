from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image
import json
import numpy as np
from pathlib import Path

DB_FILE = Path("uploads/clothes_db.json")
model = SentenceTransformer('clip-ViT-B-32')

def search_similar_items_by_image(image_path, top_k=3):
    # Encode query image
    query_embedding = model.encode(Image.open(image_path))

    # Load items
    with open(DB_FILE, "r") as f:
        clothes = json.load(f)

    results = []
    for item in clothes:
        if "image_embedding" in item:
            sim = float(cosine_similarity(
                [query_embedding],
                [item["image_embedding"]]
            )[0][0])
            results.append({"item": item, "similarity": sim})

    # Sort and pick top_k
    results = sorted(results, key=lambda x: x["similarity"], reverse=True)[:top_k]

    # Return clean list
    return [
        {"id": r["item"]["id"], "title": r["item"]["title"],
         "similarity": r["similarity"], "image": r["item"]["image"]}
        for r in results
    ]
