require('dotenv').config();
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

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// app.use(cookieParser());
// extra packages

app.get('/', (req, res) => {
  res.send('Cipio Api');
});

// routes
app.use(cors());
app.use('/api/v1/auth', authentication);
app.use('/api/v1', verifyEmail);
app.use('/api/v1', sendMail);
app.use('/api/v1/metrics', metrics);

app.use('/api/v1/transactions', auth, transactions);
app.use('/api/v1', auth, admin);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
