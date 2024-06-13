const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');

admin.initializeApp();

const db = admin.database();
const firestore = admin.firestore();

exports.submitSurvey = functions.https.onCall(async (data, context) => {
  try {
    // Verify the reCAPTCHA token
    const secret = '6LdLLPgpAAAAACj1eOZJRftH84nYBjQq5vi7lKyq';
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${data.captchaToken}`
    );

    if (!response.data.success) {
      throw new functions.https.HttpsError('invalid-argument', 'Invalid reCAPTCHA token');
    }

    // Save data to Realtime Database
    const surveysRef = db.ref('Surveys');
    const newSurveyRef = surveysRef.push();
    await newSurveyRef.set(data);

    // Save data to Firestore
    const surveysCollection = firestore.collection('Surveys');
    await surveysCollection.add(data);

    return { message: 'Survey submitted successfully' };
  } catch (error) {
    console.error('Error submitting survey:', error);
    throw new functions.https.HttpsError('internal', 'Failed to submit survey');
  }
});
