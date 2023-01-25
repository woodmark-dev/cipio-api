const mongoose = require('mongoose');

const MoralisSchema = new mongoose.Schema({
  coinPrice: {
    type: String,
  },
});

module.exports = mongoose.model('Moralis', MoralisSchema);
