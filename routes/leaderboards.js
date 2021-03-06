const leaderboards = require('../services/api').leaderboards;

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pvp', function (req, res, next) {
  leaderboards(5).then(results => {
    res.locals.categories = results.Response.allPvP;
    res.locals.lbType = 'PvP';
    res.render('leaderboards');
  }).catch(err => {
    console.log(err)
    if (err.ErrorCode == 5) {
      res.render('offline')
    }
  });
});

router.get('/raid', function (req, res, next) {
  leaderboards(4).then(results => {
    res.locals.categories = results.Response.raid;
    res.locals.lbType = 'Raid';
    res.render('leaderboards');
  }).catch(err => {
    console.log(err)
    if (err.ErrorCode == 5) {
      res.render('offline')
    }
  });
});

router.get('/pve', function (req, res, next) {
  leaderboards(7).then(results => {
    res.locals.categories = results.Response.allPvE;
    res.locals.lbType = 'PvE';
    res.render('leaderboards');
  }).catch(err => {
    console.log(err)
    if (err.ErrorCode == 5) {
      res.render('offline')
    }
  });
});

router.get('/trials', function (req, res, next) {
  leaderboards(39).then(results => {
    res.locals.categories = results.Response.trialsofthenine;
    res.locals.lbType = 'Trials';
    res.render('leaderboards');
  }).catch(err => {
    console.log(err)
    if (err.ErrorCode == 5) {
      res.render('offline')
    }
  });
});

module.exports = router;
