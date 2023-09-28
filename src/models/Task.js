const mongoose = require("mongoose");

const task = new mongoose.Schema(
  {
    text: {
      type: String,
      minlength: 3,
      maxlength: 170
    }
  },
  { versionKey: false, timestamps: true }
);
const Task = mongoose.model("task", task);

module.exports = Task;