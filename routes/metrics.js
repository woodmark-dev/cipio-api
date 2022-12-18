const express = require('express');
const router = express.Router();

const {
  updateNairaValue,
  updateUserDicount,
  updateMarchantDiscount,
  updateMarchantBonus,
  getNairaValue,
  getUserDiscount,
  getMarchantDiscount,
  getMarchantBonus,
} = require('../controllers/metrics');

router.patch('/update-naira-value', updateNairaValue);
router.patch('/update-user-discount', updateUserDicount);
router.patch('/update-marchant-disocunt', updateMarchantDiscount);
router.patch('/update-marchant-bonus', updateMarchantBonus);
router.get('/get-naira-value', getNairaValue);
router.get('/get-user-discount', getUserDiscount);
router.get('/get-marchant-discount', getMarchantDiscount);
router.get('/get-marchant-bonus', getMarchantBonus);

module.exports = router;
