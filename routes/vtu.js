const express = require('express');
const router = express.Router();

const { buyAirtime } = require('../controllers/vtu');

router.get('/buy-airtime', buyAirtime);

module.exports = router;
