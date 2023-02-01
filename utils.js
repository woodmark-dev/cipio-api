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

function getDate() {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth() + 1;
  const currentMonth =
    month.toString().length === 1 ? `0${month.toString()}` : month.toString();
  const date = new Date().getDate().toString();
  const hours = new Date().getHours();
  const currentHour =
    hours.toString().length === 1 ? `0${hours.toString()}` : hours.toString();
  const minute = new Date().getMinutes().toString();

  const time = year + currentMonth + date + currentHour + minute;
  const randomStr = 'ad8ef08acd8f';

  return time + randomStr;
}

module.exports = { runApp, getDate };
