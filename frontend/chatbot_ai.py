import requests
from config.config import GEMINI_API_KEY

def generate_tweet_content(audience_description):
    url = "https://generativelanguage.googleapis.com/v1beta/{model=models/*}:countTokens"  # Replace with the actual Gemini API endpoint
    headers = {'Authorization': f'Bearer {GEMINI_API_KEY}'}
    data = {'description': audience_description}
    
    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        return response.json()['tweet']
    else:
        return "Error: Unable to generate tweet content"