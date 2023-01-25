const { StatusCodes } = require('http-status-codes');
const axios = require('axios');

async function buyAirtime(req, res) {
  const { transactionPurpose, number, network_id, airtime } = req.query;

  async function getTransaction() {
    try {
      const response = await axios.get(
        `https://vtu.ng/wp-json/api/v1/${transactionPurpose}?username=${process.env.VTU_NG_USERNAME}&password=${process.env.VTU_NG_PASSWORD}&phone=${number}&network_id=${network_id}&amount=${airtime}`
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
  getTransaction();
}

module.exports = {
  buyAirtime,
};
