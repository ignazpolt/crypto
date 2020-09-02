var express = require('express');
var router = express.Router();
var coder = require('../public/javascripts/coder');

router.post('/', function(req, res, next) {
  console.log(req.body);
  if (req.body.secretKey && req.body.text) {
    let key;
    if (req.body.salt) {
      key = coder.createSaltedKey(req.body.secretKey, req.body.salt, 16, 256);
    } else {
      key = coder.createMD5Key(req.body.secretKey);
    }
    let iv = coder.createStdIV();

    let result;
    if (typeof req.body.encode !== 'undefined') {
      result = coder.encrypt(key, iv, req.body.text);
    } else if (typeof req.body.decode !== 'undefined') {
      result = coder.decrypt(key, iv, req.body.text);
    }

    res.render('index', {
        title: 'FRAU encode / decode',
        secretKey: req.body.secretKey,
        salt: req.body.salt,
        text: req.body.text,
        result: result
      });
  } else {
    res.send('Please enter the secret key and the text');
  }
});

module.exports = router;
