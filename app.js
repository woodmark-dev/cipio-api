require('dotenv').config();
const Moralis = require('moralis').default;
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');

//authentication middleware
const auth = require('./middleware/authentication');
// const cookieParser = require('cookie-parser');

//connectDB
const connectDB = require('./db/connect');

//routers
const authentication = require('./routes/auth');
const transactions = require('./routes/transactions');
const admin = require('./routes/admin');
const metrics = require('./routes/metrics');
const sendMail = require('./routes/send-email');
const verifyEmail = require('./routes/verify-email');
const cipioCoinPrice = require('./routes/moralis');
const buyAirtime = require('./routes/vtu');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// app.use(cookieParser());
// extra packages

app.get('/', (req, res) => {
  const baseUrl = req.get('host');
  console.log(baseUrl);
  res.send('Cipio Api');
});

// routes
app.use(cors());
app.use('/api/v1/auth', authentication);
app.use('/api/v1', verifyEmail);
app.use('/api/v1', sendMail);
app.use('/api/v1/metrics', metrics);
app.use('/api/v1', cipioCoinPrice);
app.use('/api/v1', buyAirtime);

app.use('/api/v1/transactions', auth, transactions);
app.use('/api/v1', auth, admin);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
