import csv
import os
import pandas as pd

#CSV file paths
HASHTAGS_CSV = 'data/hashtags.csv'
TWEETS_CSV = 'data/scheduled_tweets.csv'

#initialize CSV files if they don't exist
def initialize_csv_files():
    data_folder = 'data'
    os.makedirs(data_folder, exist_ok=True)  #creating folder if it doesn't exist

    #create hashtags.csv
    hashtags_file_path = os.path.join(data_folder, 'hashtags.csv')
    if not os.path.exists(hashtags_file_path):
        pd.DataFrame(columns=['hashtag', 'count']).to_csv(hashtags_file_path, index=False)

    #create scheduled_tweets.csv
    scheduled_tweets_file_path = os.path.join(data_folder, 'scheduled_tweets.csv')
    if not os.path.exists(scheduled_tweets_file_path):
        pd.DataFrame(columns=['tweet', 'scheduled_time']).to_csv(scheduled_tweets_file_path, index=False)

#read all rows from a CSV file
def read_csv(file_path):
    with open(file_path, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        return list(reader)

#append a row to a CSV file
def append_to_csv(file_path, row):
    with open(file_path, mode='a', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(row)
