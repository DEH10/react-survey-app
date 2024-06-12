import React, { useState } from 'react';
import './survey.css'; // Import the survey styles from the src folder
import StakeholderSelection from './StakeholderSelection';
import AdminSurvey from './AdminSurvey';
import CaseworkerSurvey from './CaseworkerSurvey';
import ITSurvey from './ITSurvey';
import PropertyManagerSurvey from './PropertyManagerSurvey';
import FinanceSurvey from './FinanceSurvey';

const SurveyForm = () => {
  const [selectedSurvey, setSelectedSurvey] = useState('');

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const renderSurvey = () => {
    switch (selectedSurvey) {
      case 'administrator':
        return <AdminSurvey />;
      case 'caseworker':
        return <CaseworkerSurvey />;
      case 'it':
        return <ITSurvey />;
      case 'property-manager':
        return <PropertyManagerSurvey />;
      case 'finance':
        return <FinanceSurvey />;
      default:
        return <StakeholderSelection onSurveySelect={handleSurveySelect} />;
    }
  };

  return (
    <div className="survey-container">
      {renderSurvey()}
    </div>
  );
};

export default SurveyForm;
