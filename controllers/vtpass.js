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

//Converting to vtu
async function verifyMeterDetails(req, res) {
  //variation ID is hard-coded because we only have prepaid for now
  const { customer_id, service_id } = req.query;
  try {
    const response = await axios.get(
      `https://vtu.ng/wp-json/api/v1/verify-customer?username=${process.env.VTU_NG_USERNAME}&password=${process.env.VTU_NG_PASSWORD}&customer_id=${customer_id}&service_id=${service_id}&variation_id=prepaid`
    );

    const {
      data: { data },
    } = response;

    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function rechargeMeter(req, res) {
  const { meter_number, service_id, amount, phone } = req.query;
  try {
    const response = await axios.get(
      `https://vtu.ng/wp-json/api/v1/electricity?username=${process.env.VTU_NG_USERNAME}&password=${process.env.VTU_NG_PASSWORD}&phone=${phone}&meter_number=${meter_number}&service_id=${service_id}&variation_id=prepaid&amount=${amount}`
    );

    const { data } = response;

    res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = {
  fetchCandidate,
  payForJamPin,
  fetchTransactionStatus,
  verifyMeterDetails,
  rechargeMeter,
};
