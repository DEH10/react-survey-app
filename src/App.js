import React, { useState, useEffect } from 'react';
import StakeholderSelection from './components/StakeholderSelection';
import AdminSurvey from './components/surveys/Administrator/AdminSurvey';
import ITSurvey from './components/surveys/IT/ITSurvey';
import FinanceSurvey from './components/surveys/Finance/FinanceSurvey';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { firebaseConfig } from './firebase';
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const functions = firebase.functions();

function App() {
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [surveyData, setSurveyData] = useState([]);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    try {
      const surveysCollection = firestore.collection('surveys');
      const snapshot = await surveysCollection.get();
      const surveyData = snapshot.docs.map((doc) => doc.data());
      setSurveyData(surveyData);
      console.log('Fetched Survey data:', surveyData);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleSubmit = async (data) => {
    try {
      console.log('Survey data to be submitted:', data);
      const token = await executeRecaptcha('survey');
      const submitSurvey = functions.httpsCallable('submitSurvey');
      const response = await submitSurvey({ ...data, captchaToken: token });
      console.log('Survey submitted successfully:', response.data);
      fetchSurveyData(); // Fetch the updated survey data after submission
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LdLLPgpAAAAANhJNUpiYmDuKilz0OQLfANc5mDP">
      <div className="App">
        <header className="App-header">
          <StakeholderSelection onSurveySelect={handleSurveySelect} />
        </header>
        <main>
          {selectedSurvey === 'administrator' && <AdminSurvey onSubmit={handleSubmit} />}
          {selectedSurvey === 'it' && <ITSurvey onSubmit={handleSubmit} />}
          {selectedSurvey === 'finance' && <FinanceSurvey onSubmit={handleSubmit} />}
          {/* Render the survey data only if there is data */}
          {surveyData.length > 0 && (
            <div>
              <h2>Submitted Survey Data</h2>
              {surveyData.map((survey, index) => (
                <div key={index}>
                  <p>First Name: {survey.firstName}</p>
                  <p>Last Name: {survey.lastName}</p>
                  <p>Survey Type: {survey.surveyType}</p>
                  <p>Responses: {JSON.stringify(survey.responses)}</p>
                  <p>Submitted At: {survey.submittedAt && survey.submittedAt.toDate().toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </GoogleReCaptchaProvider>
  );
}

export default App;
