const cache = new (require('node-redis-cache'))();
const rp = require('request-promise');

const factionDefs = function() {
  return rp({ uri: 'https://destiny.plumbing/en/raw/DestinyFactionDefinition.json', json: true });
}

const factionsToRedeemables = {
  697030790: ['183980811'], // Crucible
  1357903713: ['885593286'], // Trials of the Nine  
  611314723: ['3899548068'], // Vanguard Strikes
  3231773039: ['3957264072'], // Vanguard Research
  1714509342: ['1270564331'], // Future War Cult
  2105209711: ['2270228604'], // New Monarchy
  3398051042: ['2959556799'], // Dead Orbit
  24856709: ['1505278293'], // Calus
  1021210278: ['685157383', '685157381'], // Gunsmith
  4235119312: ['2640973641', '950899352', '478751073'], // EDZ  
  4196149087: ['494493680', '2014411539', '461171930'], // Titan
  1660497607: ['3201839676', '3487922223', '2949414982'], // Nesus
  828982195: ['3825769808', '1305274547', '3756389242'], // Io
}

module.exports = { factionDefs, factionsToRedeemables };