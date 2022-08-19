require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { mongodbURL } = require('./helpers/constants');

const { checkCors } = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const { routes } = require('./routes/index');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(checkCors);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(routes);

async function main() {
  await mongoose.connect(mongodbURL);

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
}

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

main();
