import React, { useState } from 'react';

const CaseworkerSurvey = () => {
  const [answers, setAnswers] = useState({});

  const caseworkerQuestions = [
    {
      id: 1,
      text: 'How do you currently handle tasks related to voucher management, applicant processing, and compliance?',
      type: 'textarea',
    },
    {
      id: 2,
      text: 'What challenges or pain points do you encounter in your day-to-day tasks?',
      type: 'textarea',
    },
    {
      id: 3,
      text: 'How do you envision automation improving your workflow and efficiency?',
      type: 'textarea',
    },
    {
      id: 4,
      text: 'What specific features or functionalities would you like to see in the automated system?',
      type: 'textarea',
    },
    {
      id: 5,
      text: 'What concerns do you have about the transition to automated processes, and how can these be addressed?',
      type: 'textarea',
    },
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1>Caseworker Survey</h1>
        <p>Please answer the following questions:</p>
      </div>
      {caseworkerQuestions.map((question) => (
        <div key={question.id} className="survey-question">
          <label>{question.text}</label>
          <textarea
            className="survey-input"
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default CaseworkerSurvey;
