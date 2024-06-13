import React, { useState } from 'react';
import StakeholderSelection from './StakeholderSelection';
import AdminSurvey from './AdminSurvey';
import ITSurvey from './ITSurvey';
import FinanceSurvey from './FinanceSurvey';

const SurveyForm = ({ handleSubmit }) => {
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  const renderSurvey = () => {
    return (
      <div>
        {selectedSurvey === 'administrator' && (
          <AdminSurvey
            onSubmit={handleSubmit}
            firstName={firstName}
            lastName={lastName}
          />
        )}
        {selectedSurvey === 'it' && (
          <ITSurvey
            onSubmit={handleSubmit}
            firstName={firstName}
            lastName={lastName}
          />
        )}
        {selectedSurvey === 'finance' && (
          <FinanceSurvey
            onSubmit={handleSubmit}
            firstName={firstName}
            lastName={lastName}
          />
        )}
        {!selectedSurvey && <StakeholderSelection onSurveySelect={handleSurveySelect} />}
      </div>
    );
  };

  return <div>{renderSurvey()}</div>;
};

export default SurveyForm;
