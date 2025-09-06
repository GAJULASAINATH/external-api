const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// === Setup ===
const app = express();
const PORT = 3000;

// === Middleware ===
app.use(bodyParser.json()); // to parse JSON body

// === Connect to MongoDB ===
// Replace this with your MongoDB URI
const MONGODB_URI = 'mongodb+srv://backendmongodb:u716zNded4JaS4QM@cluster0.drxopbp.mongodb.net/';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// === Define a Schema and Model ===
const DataSchema = new mongoose.Schema({
  content: mongoose.Schema.Types.Mixed // can store any kind of data
});

const DataModel = mongoose.model('Data', DataSchema);

// === API Route ===
app.post('/api/data', async (req, res) => {
  try {
    const newData = new DataModel({ content: req.body });
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error('❌ Error saving data:', err);
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
