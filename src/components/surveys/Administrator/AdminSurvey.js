import React, { useState } from 'react';

const AdminSurvey = ({ onNext }) => {
  const [answers, setAnswers] = useState({});

  const adminQuestions = [
    {
      id: 1,
      text: 'What are the overarching goals and objectives of the housing authority regarding automation?',
      type: 'textarea',
    },
    {
      id: 2,
      text: 'What are the budgetary constraints and resource availability for the automation project?',
      type: 'textarea',
    },
    {
      id: 3,
      text: 'What are the expectations and timelines for project implementation and deliverables?',
      type: 'textarea',
    },
    {
      id: 4,
      text: 'How will the automation project align with broader strategic initiatives and organizational goals?',
      type: 'textarea',
    },
    {
      id: 5,
      text: 'What are the key success criteria and metrics for evaluating the effectiveness of the automation project?',
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
    <div>
      <h2>Administrator Survey</h2>
      {adminQuestions.map((question) => (
        <div key={question.id}>
          <label>{question.text}</label>
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminSurvey;