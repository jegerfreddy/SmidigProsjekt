import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MiniGameBaloonsProps {
  yourTeam: string | null;
}

const MiniGameBaloons: React.FC<MiniGameBaloonsProps> = () => {
  const navigate = useNavigate();
  const yourTeam = '5';
  const [redValue, setRedValue] = useState(0);
  const [purpleValue, setPurpleValue] = useState(0);
  const [blueValue, setBlueValue] = useState(0);
  const [greenValue, setGreenValue] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const yourUserID = Number(localStorage.getItem('yourUserID') || '0');

  useEffect(() => {
    const ws = new WebSocket('ws://172.20.10.2:3000');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'MINIGAME_COUNT') {
        setRedValue(data.redCount);
        setPurpleValue(data.purpleCount);
        setBlueValue(data.blueCount);
        setGreenValue(data.greenCount);
      } else if (data.type === 'WINNER') {
        console.log('navigate to break page from component')
        setWinner(data.winner);
        setRedValue(0);
        setPurpleValue(0);
        setBlueValue(0);
        setGreenValue(0);
        navigate('/Break');
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

  const renderBalloon = () => {
    switch (yourTeam) {
      case '5':
        return (
          <div>
            <img
              src="/images/redBaloon.png"
              alt="redBaloon"
              className='position-absolute start-0'
              style={{ bottom: `${redValue}vh`, transition: 'bottom 0.5s ease' }}
            />
            <img
              src="/images/purpleBaloon.png"
              alt="purpleBaloon"
              className='position-absolute end-50'
              style={{ bottom: `${purpleValue}vh`, transition: 'bottom 0.5s ease' }}
            />
            <img
              src="/images/blueBaloon.png"
              alt="blueBaloon"
              className='position-absolute start-50'
              style={{ bottom: `${blueValue}vh`, transition: 'bottom 0.5s ease' }}
            />
            <img
              src="/images/greenBaloon.png"
              alt="greenBaloon"
              className='position-absolute end-0'
              style={{ bottom: `${greenValue}vh`, transition: 'bottom 0.5s ease' }}
            />
          </div>
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
      {winner && (
        <div className="winner-announcement position-absolute top-50 start-50 translate-middle">
          <h2>Winner is: {winner}</h2>
        </div>
      )}
    </div>
  );
};

export default MiniGameBaloons;
