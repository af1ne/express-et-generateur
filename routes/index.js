const express = require('express');
const router = express.Router();

const upload = require('./upload.js');
const email = require('./email.js');


router.use('/upload', upload);
router.use('/sendmail', email);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
