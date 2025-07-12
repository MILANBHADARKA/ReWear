# suggest_cost.py
import os
import requests
import json
import re
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

SERPER_API_KEY = os.environ.get("SERPER_API_KEY")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)

def search_current_price(brand, title):
    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }
    query = f"current price of {brand} {title} new"
    data = {"q": query}

    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    result = response.json()

    if result.get("organic"):
        snippet = result["organic"][0].get("snippet", "")
        return snippet
    return "No recent price info found."

def suggest_cost(brand, title, description, date_of_purchase, rent_duration_days):
    current_price_info = search_current_price(brand, title)
    print(f"Current price info: {current_price_info}")

    prompt = (
        f"Suggest a fair resale cost and rental cost for this second-hand clothing item based on:\n"
        f"- Brand: {brand}\n"
        f"- Title: {title}\n"
        f"- Description: {description}\n"
        f"- Date of Purchase: {date_of_purchase}\n"
        f"- Desired rental duration in days: {rent_duration_days}\n"
        f"- Current price info from the web: {current_price_info}\n\n"
        f"Return the answer ONLY in JSON like this:\n"
        f'{{"resale_price_usd": 45, "rental_price_usd": 15}}'
    )

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": (
                "You are an expert in evaluating second-hand fashion item prices and rental pricing. "
                "Return ONLY the JSON as instructed — no explanation."
            )},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    raw_output = response.choices[0].message.content.strip()
    print("Raw response from LLM:", raw_output)

    # Extract JSON object from the response using regex
    json_match = re.search(r'\{.*\}', raw_output, re.DOTALL)
    if json_match:
        try:
            price_data = json.loads(json_match.group())
        except json.JSONDecodeError:
            print("Failed to parse JSON.")
            price_data = {"resale_price_usd": None, "rental_price_usd": None}
    else:
        print("No JSON found in response.")
        price_data = {"resale_price_usd": None, "rental_price_usd": None}

    return price_data

if __name__ == "__main__":
    result2 = suggest_cost(
        brand="Nike",
        title="Air Max Sneakers",
        description="Gently used, minimal signs of wear, original box included",
        date_of_purchase="2022-03-15",
        rent_duration_days=1
    )
    print("Suggested Resale Price (USD):", result2["resale_price_usd"])
    print("Suggested Rental Price (USD):", result2["rental_price_usd"])
