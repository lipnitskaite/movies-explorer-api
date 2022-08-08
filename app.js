const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb');

  app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
}

main();
