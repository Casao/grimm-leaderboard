const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis');

const cache = cacheManager.caching({
  store: redisStore,
  url: process.env.REDIS_URL
})

module.exports = { cache }