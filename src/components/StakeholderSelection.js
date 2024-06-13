import React, { useState } from 'react';
import styled from 'styled-components';

const SelectContainer = styled.div`
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StakeholderSelection = ({ onSurveySelect }) => {
  const [selectedSurvey, setSelectedSurvey] = useState('');

  const handleSurveySelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedSurvey(selectedValue);
    onSurveySelect(selectedValue);
  };

  return (
    <SelectContainer>
      <label htmlFor="survey-select">Select your stakeholder role:</label>
      <Select
        id="survey-select"
        value={selectedSurvey}
        onChange={handleSurveySelect}
      >
        <option value="">-- Select a survey --</option>
        <option value="administrator">Administrator</option>
        <option value="it">IT</option>
        <option value="finance">Finance</option>
      </Select>
    </SelectContainer>
  );
};

export default StakeholderSelection;