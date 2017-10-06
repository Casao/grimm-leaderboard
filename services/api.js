const Traveler = require('the-traveler').default;
const Enums = require('the-traveler/build/enums');

const traveler = new Traveler({
  apikey: process.env.TRAVELER_API_KEY,
  userAgent: 'https://localhost:3000', //used to identify your request to the API
  oauthClientId: process.env.TRAVELER_CLIENT_ID,
  oauthClientSecret: process.env.TRAVELER_CLIENT_SECRET,
  debug: true
});

const factionTokens = [
  183980811,
  494493680,
  2640973641,
  3201839676,
  3825769808,
  3899548068,
  3957264072,
  2270228604,
  2959556799,
  1270564331
]

function leaderboards(type, count = 20) {
  return traveler.getClanLeaderboards(process.env.CLAN_ID, { maxtop: count, modes: [type] });
}

function url() {
  return traveler.generateOAuthURL();
}

function auth(code) {
  return traveler.getAccessToken(code)
}

function factionData(oauth) {
  traveler.oauth = oauth;
  return new Promise((resolve, reject) => {
    traveler.getMembershipDataForCurrentUser().then(membershipInfo => {
      const firstProfile = membershipInfo.Response.destinyMemberships[0]
      return traveler.getProfile(firstProfile.membershipType, firstProfile.membershipId, { components: [Enums.ComponentType.ProfileInventories, Enums.ComponentType.CharacterProgressions, Enums.ComponentType.Characters] } )
    }).then(profile => {
      var inventories = profile.Response.profileInventory.data.items;
      var characterProgressions = profile.Response.characterProgressions.data;
      var characters = profile.Response.characters.data;
      const combinedCharacters = {};
      Object.keys(characters).map(key => {
        var character = characters[key];
        character.factions = characterProgressions[key].factions;
        combinedCharacters[key] = character;
      });
      var tokens = inventories.filter(item => {
        return factionTokens.includes(item.itemHash)
      }).reduce((obj, item) => {
        obj[item.itemHash] = item;
        return obj;
      }, {});
      resolve({ tokens, combinedCharacters });
    }).catch(err => {
      reject(err);
    });
  });
}

function thing(cb) {
  traveler.getMembershipDataForCurrentUser().then(membershipInfo => {
    const firstProfile = membershipInfo.Response.destinyMemberships[0]
    return traveler.getProfile(firstProfile.membershipType, firstProfile.membershipId, { components: [Enums.ComponentType.ProfileInventories, Enums.ComponentType.CharacterProgressions] } )
  }).then(inventories => {
    var userTokens = inventories.Response.profileInventory.data.items.filter(item => {
      return tokens.includes(item.itemHash)
    }).reduce((obj, item) => {
      obj[item.itemHash] = item;
      return obj;
    }, {});
    console.log(inventories)
  }).catch(err => {
    console.log(err);
  }).catch(err => {
    console.log(err)
  })
}

module.exports = { url, leaderboards, auth, factionData };
