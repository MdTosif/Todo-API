const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  id: String,
  items: [
    {
      item: String,
      done: Boolean
    }
  ]
});

const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;
