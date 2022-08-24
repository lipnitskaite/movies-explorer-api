require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const {
  PORT,
  NODE_ENV,
  dataMoviesTest,
  dataMovies,
} = require('./helpers/constants');

const { checkCors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { errorHandler } = require('./middlewares/errorHandler');

const { routes } = require('./routes/index');

const app = express();

app.use(helmet());
app.use(checkCors);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(rateLimiter);

app.use(routes);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? dataMovies : dataMoviesTest);

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
}

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

main();
