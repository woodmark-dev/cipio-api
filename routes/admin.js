const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getAllMarchants,
  getTransactionById,
  approveMarchant,
  deleteMarchant,
  deleteUser,
  getSingleUser,
  getAllUsersTransactions,
  getSingleMarchant,
  getAllMarchantsTransactions,
  getAllUnapprovedMarchants,
  disableUser,
  enableUser,
  disableMarchant,
  enableMarchant,
} = require('../controllers/admin');

router.get('/all-users', getAllUsers);
router.get('/all-marchants', getAllMarchants);
router.get('/transactions-by-id', getTransactionById);
router.patch('/approve-marchant', approveMarchant);
router.delete('/delete-marchant', deleteMarchant);
router.delete('/delete-user', deleteUser);
router.get('/single-user', getSingleUser);
router.get('/single-marchant', getSingleMarchant);
router.get('/get-all-users-transactions', getAllUsersTransactions);
router.get('/get-all-marchants-transactions', getAllMarchantsTransactions);
router.get('/get-unapproved-marchants', getAllUnapprovedMarchants);
router.get('/disable-user', disableUser);
router.get('/enable-user', enableUser);
router.get('/disable-marchant', disableMarchant);
router.get('/enable-marchant', enableMarchant);

module.exports = router;
