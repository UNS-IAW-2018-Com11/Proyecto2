var express = require('express');
var router = express.Router();

const ctrlTorneo = require('../controllers/torneo');
/* GET torneo page. */
router.get('/:id', ctrlTorneo.index);

module.exports = router;