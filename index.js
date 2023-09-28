const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Task = require('./src/models/Task');
mongoose.Promise = global.Promise;

const mongoDB = 'mongodb+srv://taskuri:goitAREmere@cluster0.5wbf4ry.mongodb.net/?retryWrites=true&w=majority';

const app = express();

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;


app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = req.body;
  res.status(201).json(task);
});

app.delete('/tasks/:id', async (req, res) => {
  res.json({ _id: req.params.id });
});

app.patch('/tasks/:id', async (req, res) => {
  const newText = req.body.text;
  res.json({ _id: req.params.id, text: newText });
});

// app.get('/tasks/:id', async (req, res) => {
//   const id = req.params.id;
//   const task = await taskDb.getTaskById(id);
//   if (!task) {
//     return res.status(404).json({ message: 'Task not found' });
//   }
//   res.json(task);
// });







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  const connection = mongoose.connect(mongoDB);
  connection.then(() => {
    console.log('Connected to DB');
  });
});