var express = require('express');
var router = express.Router();

const ctrlTeam = require('../controllers/team');
/* GET home page. */
router.get('/:id', ctrlTeam.index);

module.exports = router;
