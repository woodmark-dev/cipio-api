const User = require('../models/User');
const Marchant = require('../models/Marchant');
const Transactions = require('../models/Transactions');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const creditUserWallet = async (req, res) => {
  const { passcode, userId } = req.query;
  const { amount } = req.body;

  if (passcode !== process.env.TRANSACTION_PASSCODE) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }
  const user = await User.findOne({ _id: userId });
  const userBalance = user.balance;

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { balance: userBalance + amount },
    {
      new: true,
    }
  );
  const transaction = await Transactions.create({
    userId,
    createdBy: 'user',
    transactionDetails: 'User has been successfully credited',
    transactionType: 'credit',
    transactionAmount: `${amount} CIPI`,
    transactionDate: new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
    }),
    success: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Your wallet has been successfully credited' });
};

const creditMarchantWallet = async (req, res) => {
  const { passcode, marchantId } = req.query;
  const { amount } = req.body;

  if (passcode !== process.env.TRANSACTION_PASSCODE) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }
  const marchant = await Marchant.findOne({ _id: marchantId });
  const marchantBalance = marchant.balance;

  const updatedMarchant = await Marchant.findByIdAndUpdate(
    { _id: marchantId },
    { balance: marchantBalance + amount },
    {
      new: true,
    }
  );
  const transaction = await Transactions.create({
    userId: marchantId,
    createdBy: 'marchant',
    transactionDetails: 'Marchant has been successfully credited',
    transactionType: 'credit',
    transactionAmount: `${amount} Naira`,
    transactionDate: new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
    }),
    success: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Your wallet has been successfully credited' });
};

const debitUserWallet = async (req, res) => {
  const { passcode, userId } = req.query;
  const { amount, transactionDetails } = req.body;
  if (passcode !== process.env.TRANSACTION_PASSCODE) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }
  const user = await User.findOne({ _id: userId });
  const userBalance = user.balance;
  if (amount > userBalance) {
    const transaction = await Transactions.create({
      userId,
      createdBy: 'user',
      transactionDetails:
        'Transaction was not successful because User does not have sufficient funds',
      transactionAmount: `${amount} CIPI`,
      transactionType: 'unsuccessful',
      transactionDate: new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos',
      }),
    });
    throw new BadRequestError(
      "You don't have suffecient balance to carry out this transaction"
    );
  }
  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    { balance: userBalance - amount },
    {
      new: true,
    }
  );
  const transaction = await Transactions.create({
    userId,
    createdBy: 'user',
    transactionDetails,
    transactionType: 'debit',
    transactionAmount: `${amount} CIPI`,
    transactionDate: new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
    }),
    success: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'User wallet was successfully debited' });
};

const debitMarchantWallet = async (req, res) => {
  const { passcode, marchantId } = req.query;
  const { amount, transactionDetails } = req.body;

  if (passcode !== process.env.TRANSACTION_PASSCODE) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }
  const marchant = await Marchant.findOne({ _id: marchantId });
  const marchantBalance = marchant.balance;

  if (amount > marchantBalance) {
    const transaction = await Transactions.create({
      userId: marchantId,
      createdBy: 'marchant',
      transactionDetails:
        'Transaction was not successful because Marchant does not have sufficient funds',
      transactionType: 'unsuccessful',
      transactionDate: new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos',
      }),
      transactionAmount: `${amount} Naira`,
    });
    throw new BadRequestError(
      "You don't have suffecient balance to carry out this transaction"
    );
  }
  const updatedMarchant = await Marchant.findByIdAndUpdate(
    { _id: marchantId },
    { balance: marchantBalance - amount },
    {
      new: true,
    }
  );
  const transaction = await Transactions.create({
    userId: marchantId,
    createdBy: 'marchant',
    transactionDetails,
    transactionType: 'debit',
    transactionAmount: `${amount} Naira`,
    transactionDate: new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
    }),
    success: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'Marchant wallet was successfully debited' });
};

const transferMarchantFund = async (req, res) => {
  const { passcode, marchantId, walletAddress } = req.query;
  const { amount } = req.body;

  if (passcode !== process.env.TRANSACTION_PASSCODE) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }

  const senderWallet = await Marchant.findOne({ _id: marchantId });
  const walletBalanceOfSender = senderWallet.balance;

  if (walletBalanceOfSender < amount) {
    const transaction = await Transactions.create({
      userId: marchantId,
      createdBy: 'marchant',
      transactionDetails:
        'Transaction was not successful because Marchant does not have sufficient funds',
      transactionType: 'unsuccessful',
      transactionAmount: `${amount} Naira`,
      transactionDate: new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos',
      }),
    });
    throw new BadRequestError(
      "You don't have sufficient amount for this transaction"
    );
  }

  const receiverWallet = await Marchant.findOne({
    walletAddress,
  });

  if (!receiverWallet) {
    const transaction = await Transactions.create({
      userId: marchantId,
      createdBy: 'marchant',
      transactionDetails:
        'Transaction was not successful because there is not marchant with the wallet address',
      transactionType: 'unsuccessful',
      transactionAmount: `${amount} Naira`,
      transactionDate: new Date().toLocaleString('en-GB', {
        timeZone: 'Africa/Lagos',
      }),
    });
    throw new BadRequestError(
      'Marchant with this wallet address does not exist'
    );
  }

  const walletBalanceOfReceiver = receiverWallet.balance;

  await Marchant.findByIdAndUpdate(
    { _id: marchantId },
    { balance: walletBalanceOfSender - amount },
    {
      new: true,
    }
  );

  await Marchant.findByIdAndUpdate(
    { _id: receiverWallet._id },
    { balance: walletBalanceOfReceiver + amount },
    {
      new: true,
    }
  );
  await Transactions.create({
    userId: marchantId,
    createdBy: 'marchant',
    transactionDetails: `You transfered ${amount} Naira to Marchant with wallet address: ${receiverWallet.walletAddress}`,
    transactionType: 'debit',
    transactionAmount: `${amount} Naira`,
    transactionDate: new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
    }),
    success: true,
  });
  await Transactions.create({
    userId: receiverWallet._id,
    createdBy: 'marchant',
    transactionDetails: `You've recieved ${amount} Naira from Marchant with wallet address: ${senderWallet.walletAddress}`,
    transactionType: 'credit',
    transactionAmount: `${amount} Naira`,
    transactionDate: new Date().toLocaleString('en-GB', {
      timeZone: 'Africa/Lagos',
    }),
    success: true,
  });

  res.status(StatusCodes.OK).json({ msg: 'Transfer was successful' });
};

const registerUnsuccessfullTransaction = async (req, res) => {
  await Transactions.create(req.body);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'transaction details are successfully saved' });
};

const getUserTransactions = async (req, res) => {
  const { userId } = req.query;
  const transactions = await Transactions.find({ userId });

  if (!userId) {
    throw new BadRequestError('Please provide correct user Id');
  }

  if (!transactions) {
    throw new BadRequestError("This user doesn't have any transaction yet");
  }

  res.status(StatusCodes.OK).json(transactions);
};

const getMarchantTransactions = async (req, res) => {
  const { marchantId } = req.query;
  const transactions = await Transactions.find({ userId: marchantId });

  if (!marchantId) {
    throw new BadRequestError('Please provide correct user Id');
  }

  if (!transactions) {
    throw new BadRequestError("This user doesn't have any transaction yet");
  }

  res.status(StatusCodes.OK).json(transactions);
};

const getUserBalance = async (req, res) => {
  const { userId } = req.query;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new BadRequestError(
      "You're not authorized to carry out this transaction"
    );
  }

  const balance = user.balance;

  res.status(200).json({ balance });
};

const getMarchantBalance = async (req, res) => {
  const { marchantId } = req.query;
  const marchant = await Marchant.findOne({ _id: marchantId });

  if (!marchant) {
    throw new BadRequestError(`No marchant with with ${marchantId} found`);
  }

  res.status(StatusCodes.OK).json({ balance: marchant.balance });
};

const getSingleTransaction = async (req, res) => {
  const { transactionId } = req.query;
  const transaction = await Transactions.findOne({ _id: transactionId });

  if (!transaction) {
    throw new BadRequestError(`No marchant with with ${transactionId} found`);
  }

  res.status(StatusCodes.OK).json(transaction);
};

module.exports = {
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
};
