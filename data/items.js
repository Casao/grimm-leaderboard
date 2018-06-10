const rp = require('request-promise');
const cache = require('../services/cache').cache;

const itemDefs = function() {
  return cache.wrap('itemDefs', () => {
    return rp({ uri: 'https://destiny.plumbing/en/raw/DestinyInventoryItemDefinition.json', json: true });
  }, { ttl: 3600 });
}

module.exports = { itemDefs };