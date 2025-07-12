# suggest_cost.py
import os
import requests
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

# Serper & Groq API keys
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

def suggest_cost(brand, title, description, date_of_purchase):
    current_price_info = search_current_price(brand, title)
    print(f"Current price info: {current_price_info}")

    prompt = (
        f"Suggest a fair resale cost for this clothing item based on these details:\n"
        f"- Brand: {brand}\n"
        f"- Title: {title}\n"
        f"- Description: {description}\n"
        f"- Date of Purchase: {date_of_purchase}\n"
        f"- Current price info from web: {current_price_info}\n"
        f"Return only the price in USD without explanation."
    )

    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=[
            {"role": "system", "content": "You are an expert in evaluating second-hand fashion item prices. So, do not give the exact prize as that of the current market, but suggest a fair price based on the condition and other factors."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    price = response.choices[0].message.content.strip()
    return price

if __name__ == "__main__":
    cost = suggest_cost(
        brand="Luis Vinston",
        title="Black Suit Jacket",
        description="like new, soft cotton fabric",
        date_of_purchase="2020-07-10"
    )
    print(f"Suggested Cost: {cost}")
