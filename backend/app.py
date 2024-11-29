# from flask import Flask, jsonify, request
# from backend.csv_database import read_csv, append_to_csv, TWEETS_CSV, HASHTAGS_CSV
# from datetime import datetime

# app = Flask(__name__)

# #route to fetch all hashtags from the CSV file
# @app.route('/api/hashtags', methods=['GET'])
# def fetch_hashtags():
#     tweets_data = read_csv(TWEETS_CSV)  #read from scheduled_tweets.csv
#     tweets = []
    
#     for row in tweets_data:
#         tweets.append({
#             'id': row.get('id', None),  #ensuring 'id' exists in the CSV
#             'hashtag': row.get('hashtag', None),
#             'content': row.get('tweet', None),  #ensuring 'tweet' column is available
#             'scheduled_time': row.get('scheduled_time', None)
#         })
    
#     return jsonify({'tweets': tweets})

# #route to schedule a new tweet
# @app.route('/api/tweet', methods=['POST'])
# def schedule_tweet():
#     data = request.json
#     tweet_id = len(read_csv(TWEETS_CSV)) + 1  #generate a new tweet ID based on number of records

#     tweet_data = [
#         tweet_id,  #the generated tweet ID
#         data.get('hashtag', None),  #get hashtag from request
#         data.get('content', None),  #get content from request
#         data.get('scheduled_time', None)  #get scheduled time from request
#     ]
    
#     append_to_csv(TWEETS_CSV, tweet_data)  #append to scheduled_tweets.csv
#     return jsonify({'message': 'Tweet scheduled successfully', 'id': tweet_id})

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, jsonify, request
from backend.csv_database import read_csv, append_to_csv, TWEETS_CSV, HASHTAGS_CSV
from backend.twitter_api import get_trending_hashtags  # Import the new function
from datetime import datetime

app = Flask(__name__)

# Route to fetch all hashtags from the CSV file
@app.route('/api/hashtags', methods=['GET'])
def fetch_hashtags():
    tweets_data = read_csv(TWEETS_CSV)  # Read from scheduled_tweets.csv
    tweets = []
    
    for row in tweets_data:
        tweets.append({
            'id': row.get('id', None),  # Ensuring 'id' exists in the CSV
            'hashtag': row.get('hashtag', None),
            'content': row.get('tweet', None),  # Ensuring 'tweet' column is available
            'scheduled_time': row.get('scheduled_time', None)
        })
    
    return jsonify({'tweets': tweets})

# Route to schedule a new tweet
@app.route('/api/tweet', methods=['POST'])
def schedule_tweet():
    data = request.json
    tweet_id = len(read_csv(TWEETS_CSV)) + 1  # Generate a new tweet ID based on number of records

    tweet_data = [
        tweet_id,  # The generated tweet ID
        data.get('hashtag', None),  # Get hashtag from request
        data.get('content', None),  # Get content from request
        data.get('scheduled_time', None)  # Get scheduled time from request
    ]
    
    append_to_csv(TWEETS_CSV, tweet_data)  # Append to scheduled_tweets.csv
    return jsonify({'message': 'Tweet scheduled successfully', 'id': tweet_id})

# New route to fetch trending hashtags based on user input
@app.route('/api/trending_hashtags', methods=['GET'])
def fetch_trending_hashtags():
    query = request.args.get('query', '')  # Get the query parameter from the request
    hashtags = get_trending_hashtags(query)  # Fetch trending hashtags using the query
    return jsonify({'hashtags': hashtags})

# New route to create a new hashtag
@app.route('/api/create_hashtag', methods=['POST'])
def create_hashtag():
    data = request.json
    new_hashtag = data.get('hashtag', None)
    content_type = data.get('content_type', None)

    if new_hashtag and content_type:
        # Here you can implement logic to save the new hashtag and content type
        # For example, append to a CSV or a database
        append_to_csv(HASHTAGS_CSV, [new_hashtag, content_type])  # Assuming you want to save it in hashtags.csv
        return jsonify({'message': 'Hashtag created successfully', 'hashtag': new_hashtag}), 201
    else:
        return jsonify({'message': 'Invalid data provided'}), 400

if __name__ == "__main__":
    app.run(debug=True)
