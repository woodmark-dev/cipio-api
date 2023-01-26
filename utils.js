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

async function getTransaction(
  transactionPurpose,
  number,
  network_id,
  amountOrvID,
  res
) {
  try {
    const response = await axios.get(
      `https://vtu.ng/wp-json/api/v1/${transactionPurpose}?username=${process.env.VTU_NG_USERNAME}&password=${process.env.VTU_NG_PASSWORD}&phone=${number}&network_id=${network_id}&amount=${amountOrvID}`
    );
    const { data } = response;

    res.status(StatusCodes.OK).json({
      message: data.message,
      code: data.code,
      vtu_transaction_id: data.data.order_id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: error.code });
  }
}

async function getTVTransaction(
  transactionPurpose,
  number,
  service_id,
  smartcard_number,
  vID,
  res
) {
  try {
    const response = await axios.get(
      `https://vtu.ng/wp-json/api/v1/${transactionPurpose}?username=${process.env.VTU_NG_USERNAME}&password=${process.env.VTU_NG_PASSWORD}&phone=${number}&service_id=${service_id}&smartcard_number=${smartcard_number}&variation_id=${vID}`
    );

    const { data } = response;

    res.status(StatusCodes.OK).json({
      message: data.message,
      code: data.code,
      vtu_transaction_id: data.data.order_id,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ code: error.code });
  }
}

module.exports = { runApp, getTransaction, getTVTransaction };
