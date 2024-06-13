import React, { useState } from 'react';

const FinanceSurvey = ({ onSubmit, firstName, lastName, setFirstName, setLastName }) => {
  const [answers, setAnswers] = useState({});

  const financeQuestions = [
    {
      id: 1,
      text: 'What is the allocated budget for the automation project, and how will funding be managed?',
      type: 'textarea',
    },
    {
      id: 2,
      text: 'How will cost-benefit analysis and ROI be assessed for the automation initiative?',
      type: 'textarea',
    },
    {
      id: 3,
      text: 'What financial implications or considerations need to be accounted for during project planning and implementation?',
      type: 'textarea',
    },
    {
      id: 4,
      text: 'How will ongoing expenses, such as licensing fees, maintenance, and support, be budgeted for and managed post-implementation?',
      type: 'textarea',
    },
    {
      id: 5,
      text: 'What financial controls or reporting requirements need to be integrated into the automated systems for financial management and accountability?',
      type: 'textarea',
    },
  ];

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };

  return (
    <div>
      <h2>Finance Department Survey</h2>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      {financeQuestions.map((question) => (
        <div key={question.id}>
          <label>{question.text}</label>
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FinanceSurvey;
