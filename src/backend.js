const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });

admin.initializeApp();

const db = admin.database();
const firestore = admin.firestore();

exports.submitSurvey = functions.https.onCall(async (data, context) => {
  try {
    // Save data to Realtime Database
    const surveysRef = db.ref('surveys');
    const newSurveyRef = surveysRef.push();
    await newSurveyRef.set(data);

    // Save data to Firestore
    const surveysCollection = firestore.collection('surveys');
    await surveysCollection.add(data);

    return { message: 'Survey submitted successfully' };
  } catch (error) {
    console.error('Error submitting survey:', error);
    throw new functions.https.HttpsError('internal', 'Failed to submit survey');
  }
});
