const api = require('../services/api');
const tokenDefs = require('../data/tokens').tokenDefs;
const classDefs = require('../data/classes').classDefs;
const factionDefs = require('../data/factions').factionDefs;
const tokensToFactions = require('../data/tokens').tokensToFaction;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
  res.redirect(api.url());
});

router.get('/callback', function(req, res, next) {
  const code = req.query.code
  api.auth(code).then((oauth) => {
    req.session.oauth = oauth;
    res.redirect('/profile');
  });
});

router.get('/', function(req, res, next) {
  if (!req.session.oauth) {
    res.redirect('/profile/login');
  }

  api.factionData(req.session.oauth).then(data => {
    const tokens = data.tokens;
    const characters = data.combinedCharacters;
    const combinedTokens = {};
    Object.keys(tokens).map((key) => {
      var tokenData = tokens[key];
      Object.assign(tokenData, tokenDefs[key])
      combinedTokens[key] = tokenData;
    });
    res.locals.tokens = combinedTokens;
    res.locals.chars = characters;
    res.locals.classDefs = classDefs;
    res.locals.factionDefs = factionDefs;
    res.locals.tokensToFactions = tokensToFactions;
    res.render('profile')
  });
});

module.exports = router;
