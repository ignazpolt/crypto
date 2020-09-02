var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'FRAU encode / decode', secretKey: '', salt: '', text: '' });
});

module.exports = router;
