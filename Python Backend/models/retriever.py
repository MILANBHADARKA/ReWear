# rewear/ml/retriever.py
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import json

DB_FILE = "uploads/clothes_db.json"

model = SentenceTransformer('all-MiniLM-L6-v2')

def search_items(query, top_k=3, threshold=0.4):
    # Load items
    with open(DB_FILE, "r") as f:
        clothes = json.load(f)

    if not clothes:
        return []

    # Prepare corpus: title + description
    corpus = [item["title"] + " " + item["description"] for item in clothes]
    corpus_embeddings = model.encode(corpus)

    # Query embedding
    query_embedding = model.encode([query])

    # Compute similarities
    similarities = cosine_similarity(query_embedding, corpus_embeddings)[0]

    # Filter by threshold
    filtered_indices = [i for i, score in enumerate(similarities) if score >= threshold]

    if not filtered_indices:
        return []  # nothing relevant found

    # Sort filtered items by similarity descending
    sorted_filtered_indices = sorted(filtered_indices, key=lambda i: similarities[i], reverse=True)

    # Pick top_k
    top_indices = sorted_filtered_indices[:top_k]

    # Return matching items + scores
    results = []
    for i in top_indices:
        item = clothes[i].copy()
        item["similarity"] = float(similarities[i])  # ensure JSON serializable
        results.append(item)

    return results
