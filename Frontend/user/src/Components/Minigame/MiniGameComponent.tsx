import React, { useState, useEffect } from 'react';

const MiniGameBaloons: React.FC = () => {
  const [redValue, setRedValue] = useState(0);
  const [purpleValue, setPurpleValue] = useState(0);

  const handleClickRed = () => {
    const newRedValue = redValue + 1;
    setRedValue(newRedValue);

    // Send increment to backend
    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'INCREMENT_MINIGAME_COUNTER', color: 'red' }));
      ws.close();
    };
  };

  const handleClickPurple = () => {
    const newPurpleValue = purpleValue + 1;
    setPurpleValue(newPurpleValue);

    // Send increment to backend
    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'INCREMENT_MINIGAME_COUNTER', color: 'purple' }));
      ws.close();
    };
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);

      if (data.type === 'WINNER') {
        alert(`Winner is: ${data.winner}`);
        setRedValue(0);
        setPurpleValue(0);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (redValue > 100) {
      setRedValue(0);
      setPurpleValue(0);
      alert('Gratulerer! Rød har vunnet spillet');
    } else if (purpleValue > 100) {
      setRedValue(0);
      setPurpleValue(0);
      alert('Gratulerer! Lilla har vunnet spillet');
    }
  }, [redValue, purpleValue]);

  return (
    <>
      <div className='position-relative vh-100'>
        <h1 className="text-center position-relative top-0 start-0 p-5">
          Hjelp laget ditt ved å gi luft til ballongen
        </h1>
        <img onClick={handleClickRed} src="/images/redBaloon.png" alt="redBaloon" className='position-absolute start-0' style={{ bottom: `${redValue}vh`, transition: 'bottom 0.5s ease' }} />
        <img onClick={handleClickPurple} src="/images/purpleBaloon.png" alt="purpleBaloon" className='position-absolute end-0' style={{ bottom: `${purpleValue}vh`, transition: 'bottom 0.5s ease' }} />
      </div>
    </>
  );
};

export default MiniGameBaloons;
