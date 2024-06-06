import React, { useState, useEffect } from 'react';

interface MiniGameBaloonsProps {
  yourTeam: string | null;
}

const MiniGameBaloons: React.FC<MiniGameBaloonsProps> = ({ yourTeam }) => {
  const [redValue, setRedValue] = useState(0);
  const [purpleValue, setPurpleValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);

  const yourUserID = Number(localStorage.getItem('yourUserID') || '0');
  console.log('Your user ID:', yourUserID);

  const handleClick = (color: string) => {
    let newValue;
    switch (color) {
      case 'red':
        newValue = redValue + 1;
        setRedValue(newValue);
        break;
      case 'purple':
        newValue = purpleValue + 1;
        setPurpleValue(newValue);
        break;
      case 'blue':
        newValue = blueValue + 1;
        setBlueValue(newValue);
        break;
      case 'green':
        newValue = greenValue + 1;
        setGreenValue(newValue);
        break;
      default:
        return;
    }

    // Send increment to backend
    const ws = new WebSocket('ws://localhost:3000');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'INCREMENT_MINIGAME_COUNTER', color }));
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
        setBlueValue(0);
        setGreenValue(0);
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
      setBlueValue(0);
      setGreenValue(0);
      alert('Gratulerer! Rød har vunnet spillet');
    } else if (purpleValue > 100) {
      setRedValue(0);
      setPurpleValue(0);
      setBlueValue(0);
      setGreenValue(0);
      alert('Gratulerer! Lilla har vunnet spillet');
    } else if (blueValue > 100) {
      setRedValue(0);
      setPurpleValue(0);
      setBlueValue(0);
      setGreenValue(0);
      alert('Gratulerer! Blå har vunnet spillet');
    } else if (greenValue > 100) {
      setRedValue(0);
      setPurpleValue(0);
      setBlueValue(0);
      setGreenValue(0);
      alert('Gratulerer! Grønn har vunnet spillet');
    }
  }, [redValue, purpleValue, blueValue, greenValue]);

  const renderBalloon = () => {
    switch (yourTeam) {
      case '1':
        return (
          <img
            onClick={() => handleClick('red')}
            src="/images/redBaloon.png"
            alt="redBaloon"
            className='position-absolute start-0'
            style={{ bottom: `${redValue}vh`, transition: 'bottom 0.5s ease' }}
          />
        );
      case '2':
        return (
          <img
            onClick={() => handleClick('purple')}
            src="/images/purpleBaloon.png"
            alt="purpleBaloon"
            className='position-absolute end-0'
            style={{ bottom: `${purpleValue}vh`, transition: 'bottom 0.5s ease' }}
          />
        );
      case '3':
        return (
          <img
            onClick={() => handleClick('blue')}
            src="/images/blueBaloon.png"
            alt="blueBaloon"
            className='position-absolute end-0'
            style={{ bottom: `${blueValue}vh`, transition: 'bottom 0.5s ease' }}
          />
        );
      case '4':
        return (
          <img
            onClick={() => handleClick('green')}
            src="/images/greenBaloon.png"
            alt="greenBaloon"
            className='position-absolute end-0'
            style={{ bottom: `${greenValue}vh`, transition: 'bottom 0.5s ease' }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='position-relative vh-100'>
      <h1 className="text-center position-relative top-0 start-0 p-5">
        Hjelp laget ditt ved å gi luft til ballongen
      </h1>
      {renderBalloon()}
    </div>
  );
};

export default MiniGameBaloons;
