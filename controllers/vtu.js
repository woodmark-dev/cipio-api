const { StatusCodes } = require('http-status-codes');
const axios = require('axios');
const { getTransaction, getTVTransaction } = require('../utils');

async function buyAirtime(req, res) {
  const { transactionPurpose, number, network_id, airtime } = req.query;
  getTransaction(transactionPurpose, number, network_id, airtime, res);
}

async function buyData(req, res) {
  const { transactionPurpose, number, network_id, v_id } = req.query;
  getTransaction(transactionPurpose, number, network_id, v_id, res);
}

async function buyTV(req, res) {
  const { transactionPurpose, number, service_id, smartcard_number, vID } =
    req.query;

  getTVTransaction(
    transactionPurpose,
    number,
    service_id,
    smartcard_number,
    vID,
    res
  );
}

module.exports = {
  buyAirtime,
  buyData,
  buyTV,
};
