const rp = require('request-promise');
const cache = require('../services/cache').cache;

const itemDefs = function() {
  return rp({ uri: 'https://destiny.plumbing/en/raw/DestinyInventoryItemDefinition.json', json: true });\
}

module.exports = { itemDefs };