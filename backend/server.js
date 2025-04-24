const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobileNumber: String
});

const Person = mongoose.model('Person', personSchema);

// Routes
app.get('/person', async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

app.post('/person', async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.json(person);
});

app.put('/person/:id', async (req, res) => {
  const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(person);
});

app.delete('/person/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/peopledb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
}); 