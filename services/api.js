const Traveler = require('the-traveler').default;
const Enums = require('the-traveler/build/enums');

const travelerOptions = {
  apikey: process.env.TRAVELER_API_KEY,
  userAgent: process.env.USER_AGENT, //used to identify your request to the API
  oauthClientId: process.env.TRAVELER_CLIENT_ID,
  oauthClientSecret: process.env.TRAVELER_CLIENT_SECRET
}

if (process.env.DEV == 'true') {
  travelerOptions.debug = true
}

const traveler = new Traveler(travelerOptions);

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
      var tokens = inventories.reduce((obj, item) => {
        obj[item.itemHash] = item;
        return obj;
      }, {});
      resolve({ tokens, combinedCharacters });
    }).catch(err => {
      reject(err);
    });
  });
}

module.exports = { url, leaderboards, auth, factionData };
