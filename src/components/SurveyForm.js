import React, { useState } from 'react';
import StakeholderSelection from './StakeholderSelection';
import AdminSurvey from './AdminSurvey';
import ITSurvey from './ITSurvey';
import FinanceSurvey from './FinanceSurvey';
import firebase, { firebaseConfig } from './firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/functions';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

firebase.initializeApp(firebaseConfig);

const functions = getFunctions(firebase.app());

const SurveyForm = () => {
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const handleSubmit = async (data) => {
    try {
      // For Firestore
      const db = getFirestore(firebase.app());
      const surveysRef = collection(db, 'surveys');
      await addDoc(surveysRef, { ...data, firstName, lastName });
      console.log('Survey submitted successfully');

      // For Cloud Functions
      const submitSurvey = httpsCallable(functions, 'submitSurvey');
      const response = await submitSurvey({ ...data, firstName, lastName });
      console.log('Survey submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const renderSurvey = () => {
    return (
      <div>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        {selectedSurvey === 'administrator' && <AdminSurvey onSubmit={handleSubmit} />}
        {selectedSurvey === 'it' && <ITSurvey onSubmit={handleSubmit} />}
        {selectedSurvey === 'finance' && <FinanceSurvey onSubmit={handleSubmit} />}
        {!selectedSurvey && <StakeholderSelection onSurveySelect={handleSurveySelect} />}
      </div>
    );
  };

  return <div>{renderSurvey()}</div>;
};

export default SurveyForm;
