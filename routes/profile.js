const api = require('../services/api');
const tokenDefs = require('../data/tokens').tokenDefs;
const classDefs = require('../data/classes').classDefs;
const factionDefs = require('../data/factions').factionDefs;
const factionsToRedeemables = require('../data/factions').factionsToRedeemables;
const bb = require('bluebird');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
  res.redirect(api.url());
});

router.get('/callback', function(req, res, next) {
  const code = req.query.code
  api.auth(code).then((oauth) => {
    req.session.cookie.maxAge = 3600000;
    req.session.oauth = oauth;
    res.redirect('/profile');
  });
});

router.get('/', function(req, res, next) {
  if (!req.session.oauth) {
    return res.redirect('/profile/login');
  }

  bb.all([api.factionData(req.session.oauth), tokenDefs(), factionDefs()]).then(vals => {
    const [data, tokenDefinitions, factionDefinitions] = vals;    
    res.locals.tokens = data.tokens;
    res.locals.chars = data.combinedCharacters;;
    res.locals.classDefs = classDefs;
    res.locals.factionsToRedeemables = factionsToRedeemables;
    res.locals.tokenDefs = tokenDefinitions;
    res.locals.factionDefs = factionDefinitions
    res.render('profile');
  }).catch(err => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});

module.exports = router;
