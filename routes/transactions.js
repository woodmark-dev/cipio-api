const express = require('express');
const router = express.Router();

const {
  creditUserWallet,
  creditMarchantWallet,
  debitUserWallet,
  debitMarchantWallet,
  transferMarchantFund,
  registerUnsuccessfullTransaction,
  getUserTransactions,
  getMarchantTransactions,
  getUserBalance,
  getMarchantBalance,
  getSingleTransaction,
} = require('../controllers/transactions');

router.patch('/credit-user-wallet', creditUserWallet);
router.patch('/credit-marchant-wallet', creditMarchantWallet);
router.patch('/debit-user-wallet', debitUserWallet);
router.patch('/debit-marchant-wallet', debitMarchantWallet);
router.patch('/transfer-marchant-fund', transferMarchantFund);
router.post(
  '/register-unsuccessful-transactions',
  registerUnsuccessfullTransaction
);
router.get('/get-user-transaction', getUserTransactions);
router.get('/get-marchant-transaction', getMarchantTransactions);
router.get('/get-user-balance', getUserBalance);
router.get('/get-marchant-balance', getMarchantBalance);
router.get('/get-single-transaction', getSingleTransaction);

module.exports = router;
