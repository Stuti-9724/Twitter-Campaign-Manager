import tweepy
from datetime import datetime
from backend.csv_database import append_to_csv, HASHTAGS_CSV
from config.config import TWITTER_API_KEY, TWITTER_API_SECRET_KEY, ACCESS_TOKEN, ACCESS_TOKEN_SECRET

def twitter_authenticate():
    auth = tweepy.OAuth1UserHandler(TWITTER_API_KEY, TWITTER_API_SECRET_KEY)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    return tweepy.API(auth)

def get_trending_hashtags(query):
    api = twitter_authenticate()
    trends = api.get_place_trends(id=1)  # Replace 1 with location WOEID if needed
    hashtags = [trend['name'] for trend in trends[0]['trends'] if query.lower() in trend['name'].lower()]

    return hashtags  # Return filtered hashtags based on the query

# The existing function to fetch trending hashtags can remain unchanged