const api = require('../services/api');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
  res.redirect(api.url());
});

router.get('/callback', function(req, res, next) {
  const code = req.query.code
  api.auth(code, () => {
    
    res.redirect('/');
  });
});

module.exports = router;
