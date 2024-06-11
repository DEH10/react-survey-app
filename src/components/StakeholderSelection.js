import React, { useState } from 'react'; 
 
const StakeholderSelection = ({ onStakeholderSelected }) => { 
  const [selectedStakeholder, setSelectedStakeholder] = useState(''); 
 
  const stakeholderOptions = [ 
    { value: 'administrator', label: 'Administrator' }, 
    { value: 'IT', label: 'IT Department' }, 
    { value: 'caseworker', label: 'Caseworker' }, 
    { value: 'propertyManager', label: 'Property Manager' }, 
    { value: 'finance', label: 'Finance Department' },
  ]; 
 
  const handleStakeholderChange = (e) => { 
    setSelectedStakeholder(e.target.value); 
    onStakeholderSelected(e.target.value); 
  }; 
 
  return ( 
    <div> 
      <label>Select your stakeholder role:</label> 
      <select value={selectedStakeholder} onChange={handleStakeholderChange}> 
        <option value="">-- Select --</option> 
        {stakeholderOptions.map((option) => ( 
          <option key={option.value} value={option.value}> 
            {option.label} 
          </option> 
        ))} 
      </select> 
    </div> 
  ); 
}; 
 
export default StakeholderSelection;