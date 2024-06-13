import React, { useState } from 'react';
import StakeholderSelection from './components/StakeholderSelection';
import AdminSurvey from './components/surveys/Administrator/AdminSurvey';
import ITSurvey from './components/surveys/IT/ITSurvey';
import FinanceSurvey from './components/surveys/Finance/FinanceSurvey';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { firebaseConfig } from './firebase';

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const functions = firebase.functions();

function App() {
  const [selectedSurvey, setSelectedSurvey] = useState('');

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleSubmit = async (data) => {
    try {
      // For Firestore
      const surveysRef = firestore.collection('surveys');
      await surveysRef.add(data);
      console.log('Survey submitted successfully');

      // For Cloud Functions
      const submitSurvey = functions.httpsCallable('submitSurvey');
      const response = await submitSurvey(data);
      console.log('Survey submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <StakeholderSelection onSurveySelect={handleSurveySelect} />
      </header>
      <main>
        {selectedSurvey === 'administrator' && <AdminSurvey onSubmit={handleSubmit} />}
        {selectedSurvey === 'it' && <ITSurvey onSubmit={handleSubmit} />}
        {selectedSurvey === 'finance' && <FinanceSurvey onSubmit={handleSubmit} />}
      </main>
    </div>
  );
}

export default App;
