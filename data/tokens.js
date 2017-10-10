// const cache = new (require('node-redis-cache'))();
const rp = require('request-promise');

const tokenDefs = function() {
  return rp({ uri: 'https://destiny.plumbing/2/en/items/None.json', json: true });
}

const tokensToFaction = {
  183980811: '697030790',
  494493680: '4196149087',
  885593286: '1357903713',
  1270564331: '1714509342',
  1505278293: '24856709',
  2270228604: '2105209711',
  2640973641: '4235119312',
  2959556799: '3398051042',
  3201839676: '1660497607',
  3825769808: '828982195',
  685157383: '1021210278'
}

module.exports = { tokenDefs, tokensToFaction }