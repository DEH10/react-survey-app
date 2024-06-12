import React, { useState, useEffect } from 'react'; 
import ProgressBar from 'progressbar.js'; 
 
const MyProgressBar = () => { 
  const [progress, setProgress] = useState(0); 
 
  useEffect(() => { 
    const bar = new ProgressBar.Line('#progress-container', { 
      strokeWidth: 4, 
      easing: 'easeInOut', 
      duration: 1400, 
      color: '#FFEA82', 
      trailColor: '#eee', 
      trailWidth: 1, 
      svgStyle: { width: '100%', height: '100%' }, 
    }); 
 
    bar.animate(progress); 
  }, [progress]); 
 
  const handleProgressChange = (e) => { 
    setProgress(e.target.value / 100); 
  }; 
 
  return ( 
    <div> 
      <div id="progress-container" style={{ height: '100px' }}></div> 
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={progress * 100} 
        onChange={handleProgressChange} 
      /> 
    </div> 
  ); 
}; 
 
export default MyProgressBar;