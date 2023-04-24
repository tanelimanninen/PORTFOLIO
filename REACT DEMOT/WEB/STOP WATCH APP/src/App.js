import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {

  // is stopwatch running
  const [isOn, setIsOn] = useState(false);
  // stopwatch timer
  const [timer, setTimer] = useState(0);
  const reset = () => {
    setIsOn(false);
    setTimer(0);
  };

  useEffect(() => {
    // just a testing
    console.log('effect runs');
     // change timer value in every second
    let interval;
    if (isOn) {
      interval = setInterval(() => setTimer(timer => timer + 1),1000);
    }    
    // clean up
    return () => clearInterval(interval);
    }, [isOn, timer]); 
    // only render if isOn or timer is different than prev state

  return (
    <div>
      <p>
        {timer}
      </p>
      {!isOn && (
        <button id="start" type="button" onClick={() => setIsOn(true)}>Start</button>
      )}
      {isOn && (
        <button id="stop" type="button" onClick={() => setIsOn(false)}>Stop</button>
      )}
      <button id="reset" type="button" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default App;
