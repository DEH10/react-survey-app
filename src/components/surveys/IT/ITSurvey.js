import React, { useState } from 'react';

const ITSurvey = ({ onSubmit, firstName, lastName, setFirstName, setLastName }) => {
  const [answers, setAnswers] = useState({});

  const itQuestions = [
    {
      id: 1,
      text: 'What existing systems and infrastructure are in place within the housing authority?',
      type: 'textarea',
    },
    {
      id: 2,
      text: 'What functional & non-functional requirements and considerations need to be addressed to fully automate the VMS?',
      type: 'textarea',
    },
    {
      id: 3,
      text: 'How will data integration, security, and system compatibility be managed during the implementation of automated processes?',
      type: 'textarea',
    },
    {
      id: 4,
      text: 'What support and expertise can the IT department provide to ensure the successful implementation and maintenance of automated systems?',
      type: 'textarea',
    },
    {
      id: 5,
      text: 'What challenges or risks do you foresee in integrating new technologies or systems into the existing IT environment?',
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
      <h2>IT Department Survey</h2>
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
      {itQuestions.map((question) => (
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

export default ITSurvey;
