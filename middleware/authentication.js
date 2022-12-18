const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError(
      'Authentication invalid. Please login again'
    );
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //attach the user to the required routes
    req.user = { userId: payload.userId };
    next();
  } catch (err) {
    throw new UnauthenticatedError(
      'Authentication invalid. Please login again'
    );
  }
};

module.exports = auth;
