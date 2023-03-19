const express = require('express');
const router = express.Router();

const {
  fetchCandidate,
  payForJamPin,
  fetchTransactionStatus,
  verifyMeterDetails,
  rechargeMeter,
} = require('../controllers/vtpass');

router.get('/fetch-jamb-candidate', fetchCandidate);

router.get('/fetch-for-jamb-pin', payForJamPin);

router.get('/fetch-jamb-transaction-status', fetchTransactionStatus);

router.get('/fetch-meter-details', verifyMeterDetails);

router.get('/pay-electric-bill', rechargeMeter);

module.exports = router;
