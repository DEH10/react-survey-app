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
        <option value="caseworker">Caseworker</option>
        <option value="it">IT</option>
        <option value="property-manager">Property Manager</option>
        <option value="finance">Finance</option>
      </Select>
    </SelectContainer>
  );
};

// Get the form element
const surveyForm = document.getElementById('stakeholderSurvey');

// Add an event listener for the submit event
surveyForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the form data
  const formData = new FormData(surveyForm);

  // Process the form data or send it to your backend service
  processFormData(formData);
});

// Function to process the form data
function processFormData(formData) {
  // Your code to handle the form data goes here
  // For example, you can send the data to a backend service using an AJAX request
  // or perform any other desired actions
  console.log('Form data:', formData);
}

export default StakeholderSelection;