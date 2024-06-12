import React, { useState } from 'react';
import StakeholderSelection from './components/StakeholderSelection';
import AdminSurvey from './components/surveys/Administrator/AdminSurvey';
import ITSurvey from './components/surveys/IT/ITSurvey';
import CaseworkerSurvey from './components/surveys/Caseworker/CaseworkerSurvey';
import PropertyManagerSurvey from './components/surveys/PropertyManager/PropertyManagerSurvey';
import FinanceSurvey from './components/surveys/Finance/FinanceSurvey';


function App() {
  const [selectedSurvey, setSelectedSurvey] = useState('');

  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };

  return (
    <div className="App">
      <header className="App-header">

        <StakeholderSelection onSurveySelect={handleSurveySelect} />
      </header>
      <main>
        {selectedSurvey === 'administrator' && <AdminSurvey />}
        {selectedSurvey === 'it' && <ITSurvey />}
        {selectedSurvey === 'caseworker' && <CaseworkerSurvey />}
        {selectedSurvey === 'property-manager' && <PropertyManagerSurvey />}
        {selectedSurvey === 'finance' && <FinanceSurvey />}
      </main>
    </div>
  );
}

export default App;
