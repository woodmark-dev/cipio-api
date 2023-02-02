const JambCandidate = require('../models/VTpass');
const { StatusCodes } = require('http-status-codes');
const { getDate } = require('../utils');
const axios = require('axios');

const config = {
  headers: {
    'api-key': process.env.VTPASS_API_KEY,
    'secret-key': process.env.VTPASS_SECRET_KEY,
  },
};

async function fetchCandidate(req, res) {
  const { candidateProfileId, paymentType } = req.query;

  try {
    const response = await axios.post(
      'https://vtpass.com/api/merchant-verify',
      {
        billersCode: candidateProfileId,
        serviceID: 'jamb',
        type: paymentType,
      },
      config
    );

    const { content } = response.data;
    console.log(getDate());

    res.status(StatusCodes.OK).json({ content });
  } catch (error) {
    const { statusText } = error.response;

    console.log(error);

    res.status(500).json({ statusText });
  }
}

async function payForJamPin(req, res) {
  const { candidateProfileId, candidateName, paymentType, phoneNumber } =
    req.query;

  try {
    const response = await axios.post(
      'https://vtpass.com/api/pay',
      {
        billersCode: candidateProfileId,
        serviceID: 'jamb',
        variation_code: paymentType,
        request_id: getDate(),
        phone: +phoneNumber,
      },
      config
    );

    const { requestId, response_description, purchased_code, Pin } =
      response.data;

    await JambCandidate.create({
      candidateProfileId,
      candidateName,
      requestId,
    });

    res
      .status(StatusCodes.OK)
      .json({ requestId, response_description, purchased_code, Pin });
  } catch (error) {
    const { statusText } = error.response;

    res.status(500).json({ statusText });
  }
}

async function fetchTransactionStatus(req, res) {
  const { candidateProfileId } = req.query;

  const candidate = await JambCandidate.findOne({ candidateProfileId });

  try {
    const response = await axios.post(
      'https://vtpass.com/api/requery',
      {
        request_id: candidate.requestId,
      },
      config
    );

    const { purchased_code, Pin, response_description } = response.data;

    res
      .status(StatusCodes.OK)
      .json({ purchased_code, Pin, response_description });
  } catch (error) {
    const { statusText } = error.response;
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ statusText });
  }
}

module.exports = {
  fetchCandidate,
  payForJamPin,
  fetchTransactionStatus,
};
