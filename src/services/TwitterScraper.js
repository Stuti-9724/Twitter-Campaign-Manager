import puppeteer from 'puppeteer';

class TwitterScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.page = await this.browser.newPage();
      // Set viewport to a common resolution
      await this.page.setViewport({ width: 1280, height: 800 });
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  async getHashtagTrends() {
    try {
      await this.initialize();
      await this.page.goto('https://twitter.com/explore', {
        waitUntil: 'networkidle0'
      });

      // Wait for trends to load
      await this.page.waitForSelector('[data-testid="trend"]');

      // Extract trending hashtags
      const trends = await this.page.evaluate(() => {
        const trendElements = document.querySelectorAll('[data-testid="trend"]');
        return Array.from(trendElements).map(trend => {
          const name = trend.querySelector('span')?.textContent || '';
          const tweetsCount = trend.querySelector('span + span')?.textContent || '';
          return { name, tweetsCount };
        });
      });

      return trends;
    } catch (error) {
      console.error('Error fetching trends:', error);
      throw error;
    }
  }

  async searchTweets(query, limit = 20) {
    try {
      await this.initialize();
      const encodedQuery = encodeURIComponent(query);
      await this.page.goto(`https://twitter.com/search?q=${encodedQuery}&src=typed_query`, {
        waitUntil: 'networkidle0'
      });

      // Wait for tweets to load
      await this.page.waitForSelector('[data-testid="tweet"]');

      // Extract tweets
      const tweets = await this.page.evaluate((tweetLimit) => {
        const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
        return Array.from(tweetElements).slice(0, tweetLimit).map(tweet => {
          const username = tweet.querySelector('[data-testid="User-Name"]')?.textContent || '';
          const content = tweet.querySelector('[data-testid="tweetText"]')?.textContent || '';
          const likes = tweet.querySelector('[data-testid="like"]')?.getAttribute('aria-label') || '0';
          const retweets = tweet.querySelector('[data-testid="retweet"]')?.getAttribute('aria-label') || '0';
          
          return {
            username,
            content,
            likes,
            retweets,
            timestamp: new Date().toISOString()
          };
        });
      }, limit);

      return tweets;
    } catch (error) {
      console.error('Error searching tweets:', error);
      throw error;
    }
  }

  async getUserProfile(username) {
    try {
      await this.initialize();
      await this.page.goto(`https://twitter.com/${username}`, {
        waitUntil: 'networkidle0'
      });

      // Extract profile information
      const profile = await this.page.evaluate(() => {
        const name = document.querySelector('[data-testid="UserName"]')?.textContent || '';
        const bio = document.querySelector('[data-testid="UserDescription"]')?.textContent || '';
        const followersCount = document.querySelector('[data-testid="UserFollowers"]')?.textContent || '';
        const followingCount = document.querySelector('[data-testid="UserFollowing"]')?.textContent || '';

        return {
          name,
          bio,
          followersCount,
          followingCount
        };
      });

      return profile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
}

export default new TwitterScraper();