import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`;

const NavigationButtons = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
}) => {
  return (
    <div>
      {currentStep > 1 && (
        <Button onClick={onPrevious}>Previous</Button>
      )}
      {currentStep < totalSteps && (
        <Button onClick={onNext}>Next</Button>
      )}
      {currentStep === totalSteps && (
        <Button onClick={onSubmit}>Submit</Button>
      )}
    </div>
  );
};

export default NavigationButtons;