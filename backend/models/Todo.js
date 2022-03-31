const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'incomeplete', // completed ,incomplete
  },
});

module.exports = mongoose.model('Todo', todoSchema);
