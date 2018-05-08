var express = require('express');
var router = express.Router();

const ctrlTeams = require('../controllers/add-teams');
/* GET home page. */
router.get('/', ctrlTeams.index);

module.exports = router;
