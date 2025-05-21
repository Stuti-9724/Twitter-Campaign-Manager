class CacheService {
  constructor() {
    this.cache = new Map();
    this.ttl = new Map();
    // Default TTL of 15 minutes
    this.defaultTTL = 15 * 60 * 1000;
  }

  set(key, value, ttl = this.defaultTTL) {
    this.cache.set(key, value);
    this.ttl.set(key, Date.now() + ttl);
  }

  get(key) {
    if (!this.cache.has(key)) {
      return null;
    }

    const expiryTime = this.ttl.get(key);
    if (Date.now() > expiryTime) {
      this.delete(key);
      return null;
    }

    return this.cache.get(key);
  }

  delete(key) {
    this.cache.delete(key);
    this.ttl.delete(key);
  }

  clear() {
    this.cache.clear();
    this.ttl.clear();
  }

  // Helper method to generate cache keys
  static generateKey(type, params) {
    return `${type}:${JSON.stringify(params)}`;
  }
}

export default new CacheService();