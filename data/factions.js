// const cache = new (require('node-redis-cache'))();
const rp = require('request-promise');
const cache = require('../services/cache').cache;

const factionDefs = function() {
  return cache.wrap('factionDefs', () => {
    return rp({ uri: 'https://destiny.plumbing/en/raw/DestinyFactionDefinition.json', json: true });
  }, { ttl: 3600 });
}


module.exports = { factionDefs };