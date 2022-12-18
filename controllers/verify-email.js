const User = require('../models/User');
const Marchant = require('../models/Marchant');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');

const verifyUserEmail = async (req, res) => {
  const { email, verificationToken } = req.query;
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('User does not exist');
  }

  if (user.verificationToken !== verificationToken) {
    throw new BadRequestError(
      'Please reregister with another email as your verification token has expired'
    );
  }

  await User.findOneAndUpdate(
    { email: email },
    { isVerified: true, verified: Date.now(), verificationToken: '' },
    {
      new: true,
    }
  );

  res.end(
    `<p>Your email has been successfully verified click <a href="https://cipio.finance/">Here</a> to login</p>`
  );
};

const verifyMarchantEmail = async (req, res) => {
  const { email, verificationToken } = req.query;
  const marchant = await Marchant.findOne({ email });

  if (!marchant) {
    throw new BadRequestError('Agent does not exist');
  }

  if (marchant.verificationToken !== verificationToken) {
    throw new BadRequestError(
      'Please reregister with another email as your verification token has expired'
    );
  }

  await Marchant.findOneAndUpdate(
    { email: email },
    { isVerified: true, verified: Date.now(), verificationToken: '' },
    {
      new: true,
    }
  );

  res.end(
    `<p>Your email has been successfully verified click <a href="https://cipio.finance/marchant-login">Here</a> to login</p><p><b>However, note that the admin has to approve your account before you can login</b></p>`
  );
};

module.exports = {
  verifyUserEmail,
  verifyMarchantEmail,
};
