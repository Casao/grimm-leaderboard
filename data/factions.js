// const cache = new (require('node-redis-cache'))();
const rp = require('request-promise');
const cache = require('../services/cache').cache;
const _ = require('lodash');

const factionDefs = function() {
  return cache.wrap('factionDefs', () => {
    return rp({ uri: 'https://destiny.plumbing/en/raw/DestinyFactionDefinition.json', json: true });
  }, { ttl: 3600 });
}

const factionTokens = function() {
  return factionDefs().then((factions) => _.flatten(_.values(factions).map((faction) => Object.keys(faction['tokenValues'] || {}))))
}

const factionList = function() {
  return factionDefs().then((factions) => _.reject(Object.keys(factions), (factionId) => typeof factions[factionId]['tokenValues'] !== 'object'))
}

module.exports = { factionDefs, factionTokens, factionList };