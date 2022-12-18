const express = require('express');
const router = express.Router();

const {
  sendUserMail,
  sendMarchantMail,
  updateUserPassword,
  updateMarchantPassword,
  sendMessageToAdmin,
  sendRechargeMessageToAdmin,
} = require('../controllers/send-mail');

router.get('/send-user-verification-email', sendUserMail);
router.get('/send-marchant-verification-email', sendMarchantMail);
router.get('/user-forgot-password', updateUserPassword);
router.get('/marchant-forgot-password', updateMarchantPassword);
router.get('/send-email-to-admin', sendMessageToAdmin);
router.get('/send-recharge-email-to-admin', sendRechargeMessageToAdmin);

module.exports = router;
