var express = require('express');
var router = express.Router();

/* POST en /test */
router.get('/', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
