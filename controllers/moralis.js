const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { runApp } = require('../utils');

async function getCoinPrice(req, res) {
  res.status(StatusCodes.OK).json({ coinPrice: await runApp() });
}

module.exports = {
  getCoinPrice,
};
