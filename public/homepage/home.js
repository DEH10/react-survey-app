import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000); // Adjust the duration (in milliseconds) to match your logo display time

    return () => clearTimeout(timer);
  }, []);

  const handleStartSurvey = () => {
    const confirmNavigation = window.confirm('Are you ready to start the survey?');

    if (confirmNavigation) {
      navigate('/survey');
    }
  };

  return (
    <div>
      {!isReady && (
        <div className="logo-container">
          <a href="https://ibb.co/ZThp8x2"><img src="https://i.ibb.co/ZThp8x2/hacp-logo.jpg" alt="hacp-logo" border="0" /></a>

        </div>
      )}
      {isReady && (
        <div className="content">
          <h1>Welcome to the HACP Automation Survey</h1>
          <p>This survey aims to gather valuable insights from stakeholders to improve our automation processes and better serve our community. Your participation is crucial in shaping the future of our organization.</p>
          <button onClick={handleStartSurvey}>Take the Survey</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
