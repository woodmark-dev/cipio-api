const mongoose = require('mongoose');

const date = new Date();

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, 'please provide user'],
  },
  createdBy: {
    type: String,
    required: [true, 'provide the entity that created the transaction'],
  },
  transactionDate: {
    type: String,
  },
  transactionDetails: {
    type: String,
    required: [true, 'please provide transaction details'],
  },
  transactionType: {
    type: String,
    required: [true, 'Please provide transaction type'],
  },
  transactionAmount: {
    type: String,
    required: [true, 'please provide transaction amount'],
  },
  success: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Transactions', TransactionSchema);
