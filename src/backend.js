const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/survey-app?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Survey schema and model
const surveySchema = new mongoose.Schema({
  name: String,
  email: String,
  responses: [
    {
      question: String,
      answer: String
    }
  ]
});

const Survey = mongoose.model('Survey', surveySchema);

// Routes
app.post('/api/surveys', async (req, res) => {
  try {
    const { name, email, responses } = req.body;
    const survey = new Survey({ name, email, responses });
    await survey.save();
    res.status(201).json({ message: 'Survey response submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit survey response' });
  }
});

app.get('/api/surveys', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve survey responses' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
