const User = require('../models/User');
const Marchant = require('../models/Marchant');
const Admin = require('../models/Admin');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const crypto = require('crypto');

const registerUser = async (req, res) => {
  const verificationToken = crypto.randomBytes(40).toString('hex');
  await User.create({ ...req.body, verificationToken });
  res.status(StatusCodes.CREATED).json({
    msg: 'Your account has been successfully created. Check your email to verify',
  });
};

const updateUserPassword = async (req, res) => {
  const { email, password, verificationToken } = req.query;
  const user = await User.findOne({ email });

  if (!user) {
    throw new BadRequestError('User does not exist');
  }
  if (user.verificationToken !== verificationToken) {
    throw new BadRequestError('Please try again');
  }
  user.verificationToken = '';
  user.password = password;

  await user.save();

  res.status(StatusCodes.OK).json({
    msg: 'Your password has been successfully updated you can now login with your new password',
  });
};

const registerMarchant = async (req, res) => {
  const verificationToken = crypto.randomBytes(40).toString('hex');
  await Marchant.create({ ...req.body, verificationToken });
  res.status(StatusCodes.CREATED).json({
    msg: 'Your account has been successfully created. Check your email to verify',
  });
};

const updateMarchantPassword = async (req, res) => {
  const { email, password, verificationToken } = req.query;
  const marchant = await Marchant.findOne({ email });
  if (!marchant) {
    throw new BadRequestError('User does not exist');
  }
  if (marchant.verificationToken !== verificationToken) {
    throw new BadRequestError('Please try again');
  }
  marchant.verificationToken = '';
  marchant.password = password;

  await marchant.save();

  res.status(StatusCodes.OK).json({
    msg: 'Your password has been successfully updated you can now login with your new password',
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new UnauthenticatedError(
      'Please check your email and verify account'
    );
  }

  if (!user.isEnabled) {
    throw new BadRequestError(
      'Your account has been disabled because of suspicious activities. Please contact admin to open your account'
    );
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    name: user.name,
    role: user.role,
    id: user._id,
    token,
  });
};

const loginMarchant = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const marchant = await Marchant.findOne({ email });
  if (!marchant) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await marchant.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  if (!marchant.isVerified) {
    throw new UnauthenticatedError(
      'Please check your email and verify account before you can login'
    );
  }

  if (!marchant.isEnabled) {
    throw new BadRequestError(
      'Your account has been disabled because of suspicious activities. Please contact admin to open your account'
    );
  }

  const token = marchant.createJWT();
  res.status(StatusCodes.CREATED).json({
    name: marchant.name,
    role: marchant.role,
    id: marchant._id,
    approved: marchant.approved,
    walletAddress: marchant.walletAddress,
    token,
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const isPasswordCorrect = await admin.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }
  const token = admin.createJWT();
  res.status(StatusCodes.CREATED).json({
    name: 'Admin1',
    role: admin.role,
    token,
  });
};

const getUser = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError('User with this email does not exist');
  }

  res.json(user);
};

const getMarchant = async (req, res) => {
  const { email } = req.query;
  const marchant = await Marchant.findOne({ email });
  if (!marchant) {
    throw new BadRequestError('Marchant with this email does not exist');
  }

  res.json(marchant);
};

module.exports = {
  registerUser,
  registerMarchant,
  loginUser,
  loginMarchant,
  loginAdmin,
  getUser,
  getMarchant,
  updateUserPassword,
  updateMarchantPassword,
};
