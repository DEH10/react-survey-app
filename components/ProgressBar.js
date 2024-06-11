import React from 'react'; 
 
const ProgressBar = ({ currentStep, totalSteps }) => { 
  const progress = (currentStep / totalSteps) * 100; 
 
  return ( 
    <div> 
      <div style={{ width: `${progress}%`, height: '20px', backgroundColor: 'green' }}></div> 
    </div> 
  ); 
}; 
 
export default ProgressBar;