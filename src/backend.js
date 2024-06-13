const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const serviceAccount = require('C:\\Users\\Daniel\\Downloads\\react-survey-backend-firebase-adminsdk-jarx6-4ee6a3b73c.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-survey-backend.firebaseio.com'
});

const app = express();
app.use(cors());
app.use(express.json());

const db = admin.database();

// Routes
app.post('/api/surveys', async (req, res) => {
  try {
    const { name, responses, firstName, lastName } = req.body;
    const surveysRef = db.ref('surveys');
    const newSurveyRef = surveysRef.push();
    await newSurveyRef.set({ name, responses, firstName, lastName });
    res.status(201).json({ message: 'Survey response submitted successfully' });
  } catch (err) {
    console.error('Error submitting survey response:', err);
    res.status(500).json({ error: 'Failed to submit survey response' });
  }
});

app.get('/api/surveys', async (req, res) => {
  try {
    const surveysRef = db.ref('surveys');
    surveysRef.once('value', (snapshot) => {
      const surveys = snapshot.val();
      res.status(200).json(surveys);
    });
  } catch (err) {
    console.error('Error retrieving survey responses:', err);
    res.status(500).json({ error: 'Failed to retrieve survey responses' });
  }
});

// Export the Express app as a Cloud Function
exports.app = functions.https.onRequest(app);
