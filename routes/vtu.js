const express = require('express');
const router = express.Router();

const { buyAirtime, buyData, buyTV } = require('../controllers/vtu');

router.get('/buy-airtime', buyAirtime);
router.get('/buy-data', buyData);
router.get('/buy-tv', buyTV);

module.exports = router;
