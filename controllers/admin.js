const User = require('../models/User');
const Marchant = require('../models/Marchant');
const Transactions = require('../models/Transactions');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    throw new BadRequestError('No users found');
  }
  res.status(StatusCodes.OK).json(users);
};

const getSingleUser = async (req, res) => {
  const { userId } = req.query;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }
  res.status(StatusCodes.OK).json(user);
};

const getAllUsersTransactions = async (req, res) => {
  const transactions = await Transactions.find({ createdBy: 'user' })
    .sort({ _id: -1 })
    .limit(400);
  if (!transactions) {
    throw new BadRequestError('No transactions found');
  }
  res.status(StatusCodes.OK).json(transactions);
};

const getAllMarchants = async (req, res) => {
  const marchants = await Marchant.find({});
  if (!marchants) {
    throw new BadRequestError('No marchants found');
  }
  res.status(StatusCodes.OK).json(marchants);
};

const getSingleMarchant = async (req, res) => {
  const { marchantId } = req.query;
  const marchant = await Marchant.findOne({ _id: marchantId });

  if (!marchant) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }
  res.status(StatusCodes.OK).json(marchant);
};

const getAllMarchantsTransactions = async (req, res) => {
  const transactions = await Transactions.find({ createdBy: 'marchant' })
    .sort({ _id: -1 })
    .limit(400);
  if (!transactions) {
    throw new BadRequestError('No transactions found');
  }
  res.status(StatusCodes.OK).json(transactions);
};

const getTransactionById = async (req, res) => {
  const { transactionId } = req.query;
  const transaction = await Transactions.findOne({
    _id: transactionId,
  });
  if (!transaction) {
    throw new BadRequestError('No transactions found');
  }

  res.status(StatusCodes.OK).json(transaction);
};

const getAllUnapprovedMarchants = async (req, res) => {
  const marchants = await Marchant.find({ approved: false });
  if (!marchants) {
    throw new BadRequestError('All marchants have been approved');
  }
  res.status(StatusCodes.OK).json(marchants);
};

const approveMarchant = async (req, res) => {
  const { marchantId } = req.query;
  await Marchant.findByIdAndUpdate(
    { _id: marchantId },
    { approved: true },
    { new: true }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Marchant has been successfully approved' });
};

const deleteMarchant = async (req, res) => {
  const { marchantId } = req.query;
  await Marchant.deleteOne({ _id: marchantId });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'Marchant has been successfully deleted' });
};

const deleteUser = async (req, res) => {
  const { userId } = req.query;
  await User.deleteOne({ _id: userId });

  res
    .status(StatusCodes.OK)
    .json({ msg: 'User has been successfully deleted' });
};

const disableUser = async (req, res) => {
  const { userId } = req.query;
  const user = await User.findOne({ _id: userId });

  user.isEnabled = false;
  await user.save();

  res.status(StatusCodes.OK).json({
    msg: 'User has been disabled',
  });
};

const enableUser = async (req, res) => {
  const { userId } = req.query;
  const user = await User.findOne({ _id: userId });

  user.isEnabled = true;
  await user.save();

  res.status(StatusCodes.OK).json({
    msg: 'User has been enabled',
  });
};

const disableMarchant = async (req, res) => {
  const { marchantId } = req.query;
  const marchant = await Marchant.findOne({ _id: marchantId });

  marchant.isEnabled = false;
  await marchant.save();

  res.status(StatusCodes.OK).json({
    msg: 'Marchant has been disabled',
  });
};

const enableMarchant = async (req, res) => {
  const { marchantId } = req.query;
  const marchant = await Marchant.findOne({ _id: marchantId });

  marchant.isEnabled = true;
  await marchant.save();

  res.status(StatusCodes.OK).json({
    msg: 'Marchant has been enabled',
  });
};

module.exports = {
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
};
