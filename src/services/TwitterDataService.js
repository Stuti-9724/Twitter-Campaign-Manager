import CacheService from './CacheService';

class TwitterDataService {
  constructor() {
    this.cache = CacheService;
  }

  async getTrendingHashtags() {
    const cacheKey = this.cache.constructor.generateKey('trends', {});
    const cachedTrends = this.cache.get(cacheKey);

    if (cachedTrends) {
      return cachedTrends;
    }

    // Mock trending hashtags data
    const mockTrends = [
      { name: '#JavaScript', tweetsCount: '12.5K tweets' },
      { name: '#ReactJS', tweetsCount: '8.2K tweets' },
      { name: '#WebDev', tweetsCount: '15.1K tweets' },
      { name: '#CodingLife', tweetsCount: '5.7K tweets' },
      { name: '#TechNews', tweetsCount: '20.3K tweets' }
    ];

    this.cache.set(cacheKey, mockTrends);
    return mockTrends;
  }

  async searchTweets(query, limit = 20) {
    const cacheKey = this.cache.constructor.generateKey('search', { query, limit });
    const cachedTweets = this.cache.get(cacheKey);

    if (cachedTweets) {
      return cachedTweets;
    }

    // Mock tweet search results
    const mockTweets = Array.from({ length: limit }, (_, i) => ({
      username: `user${i + 1}`,
      content: `Sample tweet about ${query} #${i + 1}`,
      likes: Math.floor(Math.random() * 1000),
      retweets: Math.floor(Math.random() * 500),
      timestamp: new Date().toISOString()
    }));

    this.cache.set(cacheKey, mockTweets, 5 * 60 * 1000); // 5 minutes TTL
    return mockTweets;
  }

  async getUserProfile(username) {
    const cacheKey = this.cache.constructor.generateKey('profile', { username });
    const cachedProfile = this.cache.get(cacheKey);

    if (cachedProfile) {
      return cachedProfile;
    }

    // Mock user profile data
    const mockProfile = {
      name: username,
      bio: 'This is a mock user profile bio',
      followersCount: Math.floor(Math.random() * 10000),
      followingCount: Math.floor(Math.random() * 5000)
    };

    this.cache.set(cacheKey, mockProfile, 30 * 60 * 1000); // 30 minutes TTL
    return mockProfile;
  }

  clearCache() {
    this.cache.clear();
  }

  async getHashtagAnalytics(hashtag) {
    const cacheKey = this.cache.constructor.generateKey('hashtag-analytics', { hashtag });
    const cachedAnalytics = this.cache.get(cacheKey);

    if (cachedAnalytics) {
      return cachedAnalytics;
    }

    // Mock data for demonstration
    const mockAnalytics = {
      totalTweets: Math.floor(Math.random() * 1000) + 100,
      engagementMetrics: {
        totalLikes: Math.floor(Math.random() * 5000) + 500,
        totalRetweets: Math.floor(Math.random() * 2000) + 200,
        averageEngagement: Math.floor(Math.random() * 50) + 10
      },
      hourlyActivity: Array.from({ length: 24 }, () => Math.floor(Math.random() * 50)),
      topInfluencers: [
        { username: '@techinfluencer', tweets: 15, totalEngagement: 2500 },
        { username: '@digitalmarketer', tweets: 12, totalEngagement: 2000 },
        { username: '@socialmediapro', tweets: 10, totalEngagement: 1800 },
        { username: '@contentcreator', tweets: 8, totalEngagement: 1500 },
        { username: '@trendspotter', tweets: 6, totalEngagement: 1200 }
      ]
    };

    this.cache.set(cacheKey, mockAnalytics, 15 * 60 * 1000);
    return mockAnalytics;
  }
}

export default new TwitterDataService();