class HashtagAnalytics {
  constructor(scraper) {
    this.scraper = scraper;
  }

  async getHashtagAnalytics(hashtag) {
    try {
      // Get tweets for the hashtag
      const tweets = await this.scraper.searchTweets(hashtag, 100);
      
      // Calculate engagement metrics
      const metrics = this.calculateEngagementMetrics(tweets);
      
      // Get hourly activity distribution
      const hourlyActivity = this.calculateHourlyActivity(tweets);
      
      // Get top influencers
      const topInfluencers = this.findTopInfluencers(tweets);

      return {
        totalTweets: tweets.length,
        engagementMetrics: metrics,
        hourlyActivity,
        topInfluencers,
        recentTweets: tweets.slice(0, 10) // Latest 10 tweets
      };
    } catch (error) {
      console.error('Error analyzing hashtag:', error);
      throw error;
    }
  }

  calculateEngagementMetrics(tweets) {
    return tweets.reduce((metrics, tweet) => {
      const likes = parseInt(tweet.likes) || 0;
      const retweets = parseInt(tweet.retweets) || 0;

      return {
        totalLikes: (metrics.totalLikes || 0) + likes,
        totalRetweets: (metrics.totalRetweets || 0) + retweets,
        averageEngagement: (metrics.totalLikes + metrics.totalRetweets) / tweets.length
      };
    }, { totalLikes: 0, totalRetweets: 0, averageEngagement: 0 });
  }

  calculateHourlyActivity(tweets) {
    const hourlyDistribution = new Array(24).fill(0);
    
    tweets.forEach(tweet => {
      const hour = new Date(tweet.timestamp).getHours();
      hourlyDistribution[hour]++;
    });

    return hourlyDistribution;
  }

  findTopInfluencers(tweets) {
    const influencers = tweets.reduce((acc, tweet) => {
      if (!acc[tweet.username]) {
        acc[tweet.username] = {
          username: tweet.username,
          tweets: 0,
          totalEngagement: 0
        };
      }

      acc[tweet.username].tweets++;
      acc[tweet.username].totalEngagement += 
        (parseInt(tweet.likes) || 0) + (parseInt(tweet.retweets) || 0);

      return acc;
    }, {});

    return Object.values(influencers)
      .sort((a, b) => b.totalEngagement - a.totalEngagement)
      .slice(0, 5);
  }
}

export default HashtagAnalytics;