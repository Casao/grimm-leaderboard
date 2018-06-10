const api = require('../services/api');
const itemDefs = require('../data/items').itemDefs;
const classDefs = require('../data/classes').classDefs;
const factionDefs = require('../data/factions').factionDefs;
const bb = require('bluebird');
const _ = require('lodash');

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

  bb.all([api.factionData(req.session.oauth), itemDefs(), factionDefs()]).then(vals => {
    const [data, itemDefinitions, factionDefinitions] = vals;
    res.locals.tokens = data.tokens;
    res.locals.chars = data.combinedCharacters;
    res.locals.factionList = _.reject(Object.keys(factionDefinitions), (factionId) => typeof factionDefinitions[factionId]['tokenValues'] !== 'object');
    res.locals.classDefs = classDefs;
    res.locals.itemDefs = itemDefinitions;
    res.locals.factionDefs = factionDefinitions;
    res.render('factions');
  }).catch(err => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
});

module.exports = router;
