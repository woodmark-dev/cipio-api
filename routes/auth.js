const express = require('express');
const router = express.Router();

const {
  registerUser,
  registerMarchant,
  loginUser,
  loginMarchant,
  loginAdmin,
  getUser,
  getMarchant,
  updateUserPassword,
  updateMarchantPassword,
} = require('../controllers/auth');

router.post('/register-user', registerUser);
router.post('/register-marchant', registerMarchant);
router.post('/login-user', loginUser);
router.post('/login-marchant', loginMarchant);
router.post('/login-admin', loginAdmin);
router.get('/get-user', getUser);
router.get('/get-marchant', getMarchant);
router.get('/update-user-password', updateUserPassword);
router.get('/update-marchant-password', updateMarchantPassword);

module.exports = router;
