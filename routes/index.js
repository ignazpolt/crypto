var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'FRAU encode / decode', secretKey: '', text: '' });
});

module.exports = router;
