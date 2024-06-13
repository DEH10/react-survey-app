const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true });
const axios = require('axios');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

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

    // Save data to Cloud Storage (react-survey-backend.appspot.com/Surveys)
    const bucket1 = storage.bucket('react-survey-backend.appspot.com');
    const file1 = bucket1.file('Surveys/' + Date.now() + '.json');
    await file1.save(JSON.stringify(data));

    // Save data to Cloud Storage (prj_od4Cwh377TlTMBRdABwq6pGKYSgR/r0R13LIrxJURMgB4dlNS)
    const bucket2 = storage.bucket('prj_od4Cwh377TlTMBRdABwq6pGKYSgR');
    const file2 = bucket2.file('r0R13LIrxJURMgB4dlNS/' + Date.now() + '.json');
    await file2.save(JSON.stringify(data));

    return { message: 'Survey submitted successfully' };
  } catch (error) {
    console.error('Error submitting survey:', error);
    throw new functions.https.HttpsError('internal', 'Failed to submit survey');
  }
});
