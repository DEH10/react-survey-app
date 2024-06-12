import React, { useState } from 'react'; 
 
const PropertyManagerSurvey = () => { 
  const [answers, setAnswers] = useState({}); 
 
  const propertyManagerQuestions = [ 
    { 
      id: 1, 
      text: 'What are the main responsibilities and challenges you face in managing properties and tenant relations?', 
      type: 'textarea', 
    }, 
    { 
      id: 2, 
      text: 'How do you currently handle work orders, inspections, and maintenance requests?', 
      type: 'textarea', 
    }, 
    { 
      id: 3, 
      text: 'How do you foresee automation impacting property management tasks and efficiency?', 
      type: 'textarea', 
    }, 
    { 
      id: 4, 
      text: 'What features or capabilities would you prioritize in an automated property management system?', 
      type: 'textarea', 
    }, 
    { 
      id: 5, 
      text: 'What support or training would be helpful for property managers during the transition to automated processes?', 
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
      <h2>Property Manager Survey</h2> 
      {propertyManagerQuestions.map((question) => ( 
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
 
export default PropertyManagerSurvey;