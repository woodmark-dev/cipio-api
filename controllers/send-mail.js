const Sib = require('sib-api-v3-sdk');

const crypto = require('crypto');
const User = require('../models/User');
const Marchant = require('../models/Marchant');

const client = Sib.ApiClient.instance;

const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_KEY;

const tranEmail = new Sib.TransactionalEmailsApi();
const sender = {
  email: 'cipiofinance@gmail.com',
};

const sendUserMail = async (req, res) => {
  const { email, verificationToken } = req.query;
  try {
    const receiverEmail = [
      {
        email,
      },
    ];

    const mailOptions = {
      sender,
      to: receiverEmail,
      subject: 'CIPIO FINANCE Email Verification',
      htmlContent: `<p>Click the link to verify your email:</p> <a href="https://cipio-api-01.herokuapp.com/api/v1/verify-user-email?email=${email}&verificationToken=${verificationToken}">Verify Email</a>`,
    };

    await tranEmail.sendTransacEmail(mailOptions);

    res.json({ msg: 'Mail has been successfully sent' });
  } catch (error) {
    console.log(error);
  }
};

const sendMarchantMail = async (req, res) => {
  const { email, verificationToken } = req.query;
  try {
    const receiverEmail = [
      {
        email,
      },
    ];

    const mailOptions = {
      sender,
      to: receiverEmail,
      subject: 'CIPIO FINANCE Email Verification',
      htmlContent: `<p>Click the link to verify your email:</p> <a href="https://cipio-api-01.herokuapp.com/api/v1/verify-marchant-email?email=${email}&verificationToken=${verificationToken}">Verify Email</a>`,
    };

    await tranEmail.sendTransacEmail(mailOptions);

    res.json({ msg: 'Mail has been successfully sent' });
  } catch (error) {
    console.log(error);
  }
};

const updateUserPassword = async (req, res) => {
  const { email } = req.query;
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('User does not exist');
  }

  user.verificationToken = verificationToken;
  await user.save();

  const receiverEmail = [
    {
      email,
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE Change Password',
    htmlContent: `<p>Click the link to change your password:</p> <a href="https://cipio.finance/user-forgot-password?email=${email}&verificationToken=${verificationToken}">Change Password</a>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Change password link has been sent to your email' });
};

const updateMarchantPassword = async (req, res) => {
  const { email } = req.query;
  const verificationToken = crypto.randomBytes(40).toString('hex');
  const marchant = await Marchant.findOne({ email });

  if (!marchant) {
    throw new BadRequestError('Marchant does not exist');
  }

  marchant.verificationToken = verificationToken;
  await marchant.save();

  const receiverEmail = [
    {
      email,
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE Change Password',
    htmlContent: `<p>Click the link to change your password:</p> <a href="https://cipio.finance/marchant-forgot-password?email=${email}&verificationToken=${verificationToken}">Change password</a>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Change password link has been sent to your email' });
};

const sendMessageToAdmin = async (req, res) => {
  const { transactionDetails } = req.query;

  const receiverEmail = [
    {
      email: 'cipiocipi973@gmail.com',
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE A transaction has occured',
    htmlContent: `<p>${transactionDetails}</p>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Email has been sent' });
};

const sendRechargeMessageToAdmin = async (req, res) => {
  const { transactionDetails, walletAddress } = req.query;

  const receiverEmail = [
    {
      email: 'cipiocipi973@gmail.com',
    },
  ];

  const mailOptions = {
    sender,
    to: receiverEmail,
    subject: 'CIPIO FINANCE A recharge transaction has occured',
    htmlContent: `<p>${transactionDetails}</p> <p>Wallet Address: ${walletAddress}</p>`,
  };

  await tranEmail.sendTransacEmail(mailOptions);

  res.json({ msg: 'Email has been sent' });
};

module.exports = {
  sendUserMail,
  sendMarchantMail,
  updateUserPassword,
  updateMarchantPassword,
  sendMessageToAdmin,
  sendRechargeMessageToAdmin,
};
