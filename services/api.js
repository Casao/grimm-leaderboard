const Traveler = require('the-traveler').default;
const Enums = require('the-traveler/build/enums')

const traveler = new Traveler({
  apikey: process.env.TRAVELER_API_KEY,
  userAgent: 'yourUserAgent', //used to identify your request to the API
});

function leaderboards(type, count = 20) {
  return traveler.getClanLeaderboards(process.env.CLAN_ID, { maxtop: count, modes: [type] });
}

module.exports = leaderboards;
