const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const middlewares = require('./middlewares');
const connect = require('./config');
const router = require('./routes/routes');
require('dotenv').config();

const app = express();
// connect to DB
connect();

app.use(morgan('common'));
app.use(helmet());
// body-parser alternative, for json data
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  }),
);

app.use('/', router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = 1337;
app.listen(port, () => {
  console.log('express is up port 1337');
});
