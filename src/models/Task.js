const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const task = Schema({
  text: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required: [true, 'Text is required'],
  }
}, { versionKey: false, timestamps: true }
);
// task la plural in engleza => tasks
// cat la pluarl in engleza => cats
// child la plural in engleza => childs 
const Task = mongoose.model("task", task);
module.exports = Task;
