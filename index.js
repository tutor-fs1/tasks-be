const express = require('express');
const fs = require('fs')
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Task = require('./src/models/Task');

const mongoDB = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('A pornit serverul');
  mongoose.connect(mongoDB).then(() => {
    console.log('Ne-am conectat la baza de date');
  });
});

app.get('/', (req, res) => {
  res.send('Functioneaza!');
});

app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const raspuns = await Task.findByIdAndRemove(_id);
  res.json(raspuns);
  // res.json({ _id: req.params.id });
});

app.post('/tasks', async (req, res) => {
  const taskToCreate = req.body;
  const newTask = await Task.create(taskToCreate);
  res.status(201).json(newTask);
})

app.patch('/tasks/:id', async (req, res) => {
  const taskToUpdate = req.body;
  console.log(taskToUpdate);
  const _id = req.params.id;
  await Task.findByIdAndUpdate(_id, taskToUpdate);
  const freshTask = await Task.findById(_id);
  res.json(freshTask);
})

// app.post('/tasks', async (req, res) => {
//   const task = req.body;
//   res.status(201).json(task);
// });



// app.patch('/tasks/:id', async (req, res) => {
//   const newText = req.body.text;
//   res.json({ _id: req.params.id, text: newText });
// });

// app.get('/tasks/:id', async (req, res) => {
//   const id = req.params.id;
//   const task = await taskDb.getTaskById(id);
//   if (!task) {
//     return res.status(404).json({ message: 'Task not found' });
//   }
//   res.json(task);
// });
