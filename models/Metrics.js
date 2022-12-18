const mongoose = require('mongoose');

const MetricSchema = new mongoose.Schema({
  nairaValue: {
    type: Number,
    default: 0,
  },
  userDiscount: {
    type: Number,
    default: 0,
  },
  marchantDiscount: {
    type: Number,
    default: 0,
  },
  marchantBonus: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Metrics', MetricSchema);
