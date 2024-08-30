const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  gender: String,
  hallTicketNumber: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Registration Endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, gender, hallTicketNumber, password } = req.body;

    // Validate input
    if (!name || !email || !mobile || !gender || !hallTicketNumber || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save user
    const user = new User({
      name,
      email,
      mobile,
      gender,
      hallTicketNumber,
      password,
    });

    await user.save();
    res.status(201).json({ message: 'Userregisteredsuccessfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});