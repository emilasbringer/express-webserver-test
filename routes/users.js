var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Detta blir sen vad servern visar');
});

module.exports = router;
