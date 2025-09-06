const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// === Setup ===
const app = express();
const PORT = 3000;

// === Middleware ===
app.use(bodyParser.json()); // to parse JSON body
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String
});


const User = mongoose.model('User', userSchema);

// === API Route ===

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const newUser = new User({ name, email, phone });
    await newUser.save();

    res.status(201).json({ message: 'User saved successfully' });
  } catch (err) {
    console.error('❌ Error saving user:', err);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// === Start Server ===
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
