import React, { useEffect, useState } from 'react';

const AdminServerToUserPage: React.FC = () => {
  const [actEventId, setActEventId] = useState('');
  const [actId, setActId] = useState('');
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
        alert(`Winner is: ${data.winner}`);
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

  return (
    <div>
      <h1>Admin Page</h1>
      <input
        type="text"
        placeholder="actEventId"
        value={actEventId}
        onChange={(e) => setActEventId(e.target.value)}
      />
      <input
        type="text"
        placeholder="actEventId"
        value={actId}
        onChange={(e) => setActId(e.target.value)}
      />
      <button onClick={() => sendCommand('START', '', '')}>Start Game</button>
      <button onClick={() => sendCommand('WAITING', '', '')}>Waiting</button>
      <button onClick={() => sendCommand('VOTING', actEventId, '')}>Start Voting</button>
      <button onClick={() => sendCommand('RESULT', actEventId, '')}>Show Results</button>
      <button onClick={() => sendCommand('FEEDBACK', '', actId)}>Feedback</button>
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
