import React, { useState, useCallback } from 'react';
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

  const handleSurveySubmit = (data) => {
    handleSubmit({ ...data, firstName, lastName });
  };

  const memoizedSetFirstName = useCallback((value) => {
    setFirstName(value);
  }, []);

  const memoizedSetLastName = useCallback((value) => {
    setLastName(value);
  }, []);

  const renderSurvey = () => {
    return (
      <div>
        {selectedSurvey === 'administrator' && (
          <AdminSurvey
            onSubmit={handleSurveySubmit}
            firstName={firstName}
            lastName={lastName}
            setFirstName={memoizedSetFirstName}
            setLastName={memoizedSetLastName}
          />
        )}
        {selectedSurvey === 'it' && (
          <ITSurvey
            onSubmit={handleSurveySubmit}
            firstName={firstName}
            lastName={lastName}
            setFirstName={memoizedSetFirstName}
            setLastName={memoizedSetLastName}
          />
        )}
        {selectedSurvey === 'finance' && (
          <FinanceSurvey
            onSubmit={handleSurveySubmit}
            firstName={firstName}
            lastName={lastName}
            setFirstName={memoizedSetFirstName}
            setLastName={memoizedSetLastName}
          />
        )}
        {!selectedSurvey && <StakeholderSelection onSurveySelect={handleSurveySelect} />}
      </div>
    );
  };

  return <div>{renderSurvey()}</div>;
};

export default SurveyForm;
