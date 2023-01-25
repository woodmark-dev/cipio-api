const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
const { BadRequestError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

// async function runApp() {
//   await Moralis.start({
//     apiKey: 'JhNUZ4tjmZv0IBmbh98KFEF3HephX5UmDfPfG2aPwuj1rFtcPMV9lBRGxoWZDlxn',
//   });

//   const address = '0xe68626f79b5C4CFA9686A091d3303E4c624DFeCf';

//   const chain = EvmChain.BSC;

//   const response = await Moralis.EvmApi.token.getTokenPrice({
//     address,
//     chain,
//   });

//   console.log(response.toJSON().usdPrice);
// }

async function getCoinPrice(req, res) {
  await Moralis.start({
    apiKey: 'JhNUZ4tjmZv0IBmbh98KFEF3HephX5UmDfPfG2aPwuj1rFtcPMV9lBRGxoWZDlxn',
  });

  const address = '0xe68626f79b5C4CFA9686A091d3303E4c624DFeCf';

  const chain = EvmChain.BSC;

  const response = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });

  res.status(StatusCodes.OK).json({ coinprice: response.toJSON().usdPrice });
}

module.exports = {
  getCoinPrice,
};
