const mongoose = require('mongoose');

const a = new Date();
const b = new Date(+a - a.getTimezoneOffset() + 3600000)
  .toISOString()
  .split('.')[0];

const date = 'Date: ';

const time = ' Time: ';

c = b.slice(0, 10);

d = b.slice(11);

const concatDate = date.concat(c);
const concatTime = time.concat(d);

const concatDateTime = concatDate.concat(concatTime);

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
    default: concatDateTime,
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
