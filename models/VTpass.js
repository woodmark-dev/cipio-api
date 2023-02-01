const mongoose = require('mongoose');

const JambCandidateSchema = new mongoose.Schema({
  candidateName: {
    type: String,
    required: [true, 'please provide candidate name'],
  },
  candidateProfileId: {
    type: String,
    required: [true, 'please provide candidate profile id'],
  },
  requestId: {
    type: String,
    required: [true, 'please provide request id'],
  },
});

module.exports = mongoose.model('JambCandidates', JambCandidateSchema);
