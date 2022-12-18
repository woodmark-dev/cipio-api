const Metric = require('../models/Metrics');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const _id = '638dcae5937082fd6c415208';

const updateNairaValue = async (req, res) => {
  const { amount } = req.body;
  await Metric.findByIdAndUpdate(
    { _id },
    { nairaValue: amount },
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Naira value has been successfully updated' });
};

const updateUserDicount = async (req, res) => {
  const { amount } = req.body;
  await Metric.findByIdAndUpdate(
    { _id },
    {
      userDiscount: amount,
    },
    {
      new: true,
    }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'User dicount has been successfully updated' });
};

const updateMarchantDiscount = async (req, res) => {
  const { amount } = req.body;
  await Metric.findByIdAndUpdate(
    { _id },
    { marchantDiscount: amount },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Marchant discount has been successfully updated' });
};

const updateMarchantBonus = async (req, res) => {
  const { amount } = req.body;
  await Metric.findByIdAndUpdate(
    { _id },
    {
      marchantBonus: amount,
    },
    { new: true }
  );
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Marchant bonus has been successfully updated' });
};

const getNairaValue = async (req, res) => {
  const data = await Metric.findOne({ _id });

  const nairaValue = data.nairaValue;
  res.status(StatusCodes.OK).json({ nairaValue });
};

const getUserDiscount = async (req, res) => {
  const data = await Metric.findOne({ _id });
  const userDiscount = data.userDiscount;
  res.status(StatusCodes.OK).json({ userDiscount });
};

const getMarchantDiscount = async (req, res) => {
  const data = await Metric.findOne({ _id });
  const marchantDiscount = data.marchantDiscount;
  res.status(StatusCodes.OK).json({ marchantDiscount });
};

const getMarchantBonus = async (req, res) => {
  const data = await Metric.findOne({ _id });
  const marchantBonus = data.marchantBonus;
  res.status(StatusCodes.OK).json({ marchantBonus });
};

module.exports = {
  updateNairaValue,
  updateUserDicount,
  updateMarchantDiscount,
  updateMarchantBonus,
  getNairaValue,
  getUserDiscount,
  getMarchantDiscount,
  getMarchantBonus,
};
