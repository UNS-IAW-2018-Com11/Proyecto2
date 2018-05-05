var express = require('express');
var router = express.Router();

const ctrlTorneo = require('../controllers/torneo');
/* GET home page. */
router.get('/', ctrlTorneo.index);

module.exports = router;