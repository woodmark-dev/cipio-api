const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');

async function runApp() {
  const address = '0xe68626f79b5C4CFA9686A091d3303E4c624DFeCf';

  const chain = EvmChain.BSC;

  const response = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });

  return response.toJSON().usdPrice;
}

module.exports = runApp;
