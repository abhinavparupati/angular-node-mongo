const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/peopledb')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Person Schema
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mobileNumber: String
});

const Person = mongoose.model('Person', personSchema);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

// Get all people
app.get('/person', async (req, res) => {
  try {
    const people = await Person.find();
    console.log('Found people:', people);
    res.json(people);
  } catch (error) {
    console.error('Error getting people:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get single person
app.get('/person/:id', async (req, res) => {
  try {
    console.log('Getting person with ID:', req.params.id);
    const person = await Person.findById(req.params.id);
    if (!person) {
      console.log('Person not found');
      return res.status(404).json({ message: 'Person not found' });
    }
    console.log('Found person:', person);
    res.json(person);
  } catch (error) {
    console.error('Error getting person:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create person
app.post('/person', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    console.log('Created person:', person);
    res.status(201).json(person);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update person
app.put('/person/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    console.log('Updated person:', person);
    res.json(person);
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete person
app.delete('/person/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    console.log('Deleted person:', person);
    res.json({ message: 'Person deleted' });
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ message: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 