const express = require('express');
const router = express.Router();

const {
  verifyUserEmail,
  verifyMarchantEmail,
} = require('../controllers/verify-email');

router.get('/verify-user-email', verifyUserEmail);
router.get('/verify-marchant-email', verifyMarchantEmail);

module.exports = router;
