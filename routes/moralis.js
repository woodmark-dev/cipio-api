const express = require('express');
const router = express.Router();

const { getCoinPrice } = require('../controllers/moralis');

router.get('/get-cipio-price', getCoinPrice);

module.exports = router;
