const express = require('express');
const router = express.Router();

const {
  fetchCandidate,
  payForJamPin,
  fetchTransactionStatus,
} = require('../controllers/vtpass');

router.get('/fetch-jamb-candidate', fetchCandidate);

router.get('/fetch-for-jamb-pin', payForJamPin);

router.get('/fetch-jamb-transaction-status', fetchTransactionStatus);

module.exports = router;