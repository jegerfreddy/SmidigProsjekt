import React, { useContext, useEffect, useState } from 'react';
import { IAdminContext } from '../Interfaces/IAdminContext';
import { AdminContext } from '../Context/AdminContext';
import { useLocation } from 'react-router-dom';

const AdminServerToUserPage: React.FC = () => {
  const location = useLocation();
  const actID = location.state;
  
  const actId = actID.toString();

  const [actEventId, setActEventId] = useState('');
  const [ setActId] = useState('');
  const [redCount, setRedCount] = useState(0);
  const [purpleCount, setPurpleCount] = useState(0);
  const [blueCount, setBlueCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [winner, setWinner] = useState('');
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');

    websocket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    websocket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received:', data);

      if (data.type === 'MINIGAME_COUNT') {
        setRedCount(data.redCount);
        setPurpleCount(data.purpleCount);
        setBlueCount(data.blueCount);
        setGreenCount(data.greenCount);
      } else if (data.type === 'WINNER') {
        setWinner(data.winner);
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    websocket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  const sendCommand = (command: string, actEventId: string, actId: string) => {
    if (ws) {
      ws.send(JSON.stringify({ type: 'CHANGE_GAME_STATE', state: command, actEventId, actId }));
    } else {
      console.error('WebSocket connection is not open');
    }
  };

  const handleStartMiniGame = () => {
    sendCommand('MINIGAME', actEventId, actId);
  };


  const [sortedEventIDs, setSortedEventIDs] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { events } = useContext(AdminContext) as IAdminContext;


  useEffect(() => {
      const actEvents = events.filter((event) => event.actID === Number(actId));

      actEvents.sort((a, b) => a.eventIndex - b.eventIndex);

      setSortedEventIDs(actEvents.map(event => event.acteventID));
      setCurrentIndex(0);
      console.log('Event:', actEvents);
  }, [actId, events]);


  const handleButtonClick = (command: string) => {
      if (sortedEventIDs.length > 0 && currentIndex < sortedEventIDs.length) {
          const eventId = sortedEventIDs[currentIndex].toString();
          sendCommand(command, eventId, '');
          setActEventId(eventId);
          setCurrentIndex(currentIndex + 1);
          console.log('Current index:', currentIndex);
          console.log('Current event:', eventId);
      }
  };



  return (
      <div>
          <h1>Admin Page</h1>

          <button onClick={() => sendCommand('START', '', '')}>Start Game</button>
          <button onClick={() => handleButtonClick('VOTING')}>Start Voting</button>
          <button onClick={() => sendCommand('FEEDBACK', '', actId)}>Feedback</button>
          <button onClick={() => sendCommand('PAUSE', '', '')}>Pause</button>
          <button onClick={() => sendCommand('STANDBY', '', '')}>StandBy</button>
          <button onClick={handleStartMiniGame}>MINIGAME</button>
          
          <h1>MiniGame Counter</h1>
          <p>Red: {redCount}</p>
          <p>Purple: {purpleCount}</p>
          <p>Blue: {blueCount}</p>
          <p>Green: {greenCount}</p>
          <h2>Winner: {winner}</h2>
      </div>
  );
};

export default AdminServerToUserPage;