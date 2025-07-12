import joblib
from datetime import datetime
from sentence_transformers import SentenceTransformer
import numpy as np
import requests
from dotenv import load_dotenv
import os
load_dotenv()

SERPAPI_KEY = os.getenv("SERPER_API_KEY")

model = joblib.load('models/pricing_model.joblib')
encoder = joblib.load('models/brand_encoder.joblib')
text_model = SentenceTransformer('all-MiniLM-L6-v2')

def predict_price(item):
    age_days = (datetime.now() - datetime.strptime(item["date_of_purchase"], "%Y-%m-%d")).days
    text = item["title"] + " " + item["description"]
    text_emb = text_model.encode([text])
    brand_vec = encoder.transform([[item["brand_name"]]]).toarray()
    features = np.hstack([text_emb, brand_vec, [[age_days]]])
    price = model.predict(features)[0]
    return round(price,2)

def research_price(item):
    query = f"{item['brand_name']} {item.get('predicted_type','casual')} price"
    url = f"https://serpapi.com/search.json?q={query}&api_key={SERPAPI_KEY}"
    r = requests.get(url)
    data = r.json()
    prices = []
    for res in data.get('shopping_results', []):
        price = res.get('price')
        if price and price.startswith('₹'):
            p = ''.join(filter(str.isdigit, price))
            if p:
                prices.append(int(p))
    if prices:
        return round(sum(prices)/len(prices),2)
    return None

def adjust_price(context):
    base = context['pricing_agent']
    live = context['research_agent']
    if live:
        return round((0.5*base)+(0.5*live),2)
    else:
        return base
