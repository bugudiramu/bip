const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const todoRoute = require('./routes/todo');

const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to DB
mongoose.connect(process.env.DB_URL).catch(function (reason) {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

mongoose.connection.on('connected', () => console.log('Connected to Mongo DB'));
mongoose.connection.on('error', (e) =>
  console.log('Failed to Connect Mongo DB' + e)
);

//   Middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json({ extended: false }));
app.use('/api/todo', todoRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ' + PORT));

// DB_URL=mongodb://localhost:27017/test
