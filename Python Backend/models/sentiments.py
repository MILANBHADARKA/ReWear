from transformers import pipeline
sentiment_model = pipeline("sentiment-analysis")

def analyze_sentiment(text):
    result = sentiment_model(text)[0]
    score = result['score']
    label = result['label'].lower()  # 'positive' or 'negative'
    if 0.45 < score < 0.55:
        return "neutral"
    else:
        return label
