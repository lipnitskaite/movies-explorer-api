require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { checkCors } = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const { routes } = require('./routes/routes');

const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(checkCors);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb');

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App is listening on ${PORT}`);
  });
}

app.use(errors());
app.use(errorHandler);

main();
